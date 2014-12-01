'use strict';

/**
 * @ngdoc function
 * @name interviewsExplorationApp.controller:DocsCtrl
 * @description
 * # DocsCtrl
 * Controller of the interviewsExplorationApp
 */
 angular.module('interviewsExplorationApp')
 .controller('DocsCtrl', ['$scope', 'Gdocs', '$rootScope', function($scope, Gdocs, $rootScope) {

  $scope.searchTerm = "";

    //from 'mm:ss' to seconds
    function timeFormat(input){
      var vals = input.split(':');
      if(vals.length === 2){
        return (+vals[0]*60)+(+vals[1])
      }
      return 0;
    }

    $rootScope.$watch("tab", function(){
      if($rootScope.spreadsheet == undefined || $rootScope.tab == undefined || $scope.rawData == undefined)
        return;
      $scope.interviewsData = $scope.rawData[$rootScope.tab].elements;
        prepareData();
    });

    $rootScope.$watch("spreadsheet", function(){
      if($rootScope.spreadsheet == undefined || $rootScope.tab == undefined)
        return;

      //table formatting available : timecodein ; text
      Gdocs.getSpreadsheetTabletop($rootScope.spreadsheet, $rootScope.tab, function(data) {
        $scope.rawData = data;
        $scope.interviewsData = $scope.rawData[$rootScope.tab].elements;
        prepareData();
      
    });

    
})

var prepareData = function(){

      var palierDuration = 0;

        for(var i = 0 ; i < $scope.interviewsData.length ; i++){

          if(i>0){
            if($scope.interviewsData[i].fichier != $scope.interviewsData[i-1].fichier){           
              palierDuration += timeFormat($scope.interviewsData[i-1].duration);
            }
          }
          $scope.interviewsData[i].beginSec = palierDuration + timeFormat($scope.interviewsData[i].timecodein);

        //calculating the end of the piece basing on next one
        if(i < $scope.interviewsData.length - 1){
          if(i>0){
           if($scope.interviewsData[i].fichier === $scope.interviewsData[i+1].fichier)
            $scope.interviewsData[i].endSec = palierDuration + timeFormat($scope.interviewsData[i+1].timecodein);
          else $scope.interviewsData[i].endSec = timeFormat($scope.interviewsData[i].duration)+palierDuration + timeFormat($scope.interviewsData[i+1].timecodein);
        }else $scope.interviewsData[i].endSec = palierDuration + timeFormat($scope.interviewsData[i+1].timecodein);
      }
      else {
        if($rootScope.videoData)
            $scope.interviewsData[i].endSec = $rootScope.videoData.duration;//palierDuration + timeFormat($scope.interviewsData[i].timecodein) + 60;
          else $scope.interviewsData[i].endSec = palierDuration + timeFormat($scope.interviewsData[i].timecodein) + 60;
        }
      }

    };





$scope.resetSearch = function(){
  $scope.searchTerm = "";
}


    //deep search for filtering texts
    $scope.find = function(d, searchTerm){

      if(searchTerm.length > 2){


        if(!d || !searchTerm || searchTerm == "") return false;

        for(var i in d){

          if(typeof d[i] == "string"){
            if(d[i].toLowerCase().indexOf(searchTerm.toLowerCase()) != -1)
              return false;
          }else if(typeof d[i] == "array"){
            var data = d[i];
            for(var n in data){
              if(data[n].toLowerCase().indexOf(searchTerm.toLowerCase()) != -1)
                return false;
            }
          }
        }
        return true;

      }

    }


  }])