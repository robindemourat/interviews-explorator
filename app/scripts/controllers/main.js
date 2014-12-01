'use strict';

/**
 * @ngdoc function
 * @name interviewsExplorationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the interviewsExplorationApp
 */
 angular.module('interviewsExplorationApp')
 .controller('MainCtrl', function ($scope, $http, $rootScope) {



    //load meta specific to the interview
    $http.get('meta.json')
    .success(function(data, status, headers, config){

        $rootScope.vimeoId = data.vimeo.match(/\d+/)[0];
        $rootScope.spreadsheet = data.spreadsheet;
        $rootScope.tab = data.tab;
    })
    .error(function(data, status, headers, config){
        alert("Error while loading interview metadata");
    });


    $scope.isActive = function(val){

        return val.beginSec < $rootScope.seconds && val.endSec > $rootScope.seconds;
    }

    $scope.isPast = function(val){
        return val.endSec < $rootScope.seconds;
    } 

    $scope.handleResearch = function(val){
        var iframe = $("iframe")[0];
        var player = $f(iframe);
        player.api('seekTo', val.beginSec);
        player.api('play');

        $(".left").animate({
            scrollTop : $('.left').scrollTop() + $('.left #'+val.beginSec).position().top - window.innerHeight/2
        }, 'slow');


    }

    $scope.scrollToActive = function(){

        if($('.left .active').length > 0){

            $(".left").animate({
                scrollTop : $('.left').scrollTop() + $('.left .active') - window.innerHeight/2
            }, 'slow');

        }
    }

   $scope.showModal = function(){
       $('#modal-change').modal();
   }

   $scope.updateModal = function(){
    $scope.updateMeta();
    $('#modal-change').modal("hide");
   }


   $scope.updateMeta = function(){

    if($scope.tempVimeo != undefined){
        $rootScope.vimeoId = $scope.tempVimeo.match(/\d+/)[0];
    }
       
   if($scope.temSpreadsheet != undefined){
        $rootScope.spreadsheet = $scope.tempSpreadsheet;
   }
     
     if($scope.tempTab != undefined){
        $rootScope.tab = $scope.tempTab;
     }
         

     
}

});
