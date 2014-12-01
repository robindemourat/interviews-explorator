'use strict';

/**
 * @ngdoc directive
 * @name interviewsExplorationApp.directive:vimeoPlayer
 * @description
 * # vimeoPlayer
 */


 //inspired by : https://github.com/aaani/angular-vimeo 

angular.module('interviewsExplorationApp')
  .directive('vimeoPlayer', ['$http', '$rootScope',function ($http, $rootScope, $apply) {
        return {
            restrict:'AEC',
            scope:{
                videoID:'@videoid'
            },
            link:function (scope, element) {


            $rootScope.$watch('vimeoId', function() {
                if($rootScope.vimeoId == undefined)
                    return;

                var id =  $rootScope.vimeoId;

                $rootScope.seconds = 0;

                var w = element[0].offsetWidth;
                var h = element[0].offsetHeight;

                var oEmbedUrl = 'http://vimeo.com/api/oembed.json';
                var vidUrl = oEmbedUrl + '?url=' 
                + encodeURIComponent('http://vimeo.com/'+id)+"&title=0&by=0&api=0&portrait=0&badge=0";

                $http({
                    method: 'GET', 
                    url: vidUrl
                    }).
                    success(function(data, status, headers, config) {
                        $rootScope.currentVideo = data;

                        var vidHTML = data.html;
                        element[0].innerHTML = unescape(vidHTML);
                        element[0].children[0].height = h;   
                        element[0].children[0].width = w;


                        var iframe = $("iframe")[0];
                        var player = $f(iframe);


                             player.addEvent('ready', function() {
                                
                                player.addEvent('pause', onPause);
                                player.addEvent('finish', onFinish);
                                player.addEvent('playProgress', onPlayProgress);
                            });

                            function onPause(id) {
                                //console.log("paused")
                            }

                            function onFinish(id) {
                                //console.log("finished");
                            }

                            function onPlayProgress(data, id) {
                               $rootScope.seconds = data.seconds;
                               $rootScope.$apply();
                            }

                }).
                error(function(data, status, headers, config) {
                    console.log("angular-vimeo: Unable to load video from "+vidUrl);
                });
                   
               });
            
                
            }
        };
    }]);