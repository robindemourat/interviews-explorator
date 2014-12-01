'use strict';

/**
 * @ngdoc service
 * @name interviewsExplorationApp.GDocs
 * @description
 * # GDocs
 * Service in the interviewsExplorationApp.
 */


 //taken from : https://github.com/7hny/angular-google-spreadsheet

angular.module('interviewsExplorationApp')
.value('version', '0.1').
 	factory('Gdocs', function($resource, $rootScope, $http) {

    var factory = {};

    factory.getSpreadsheetTabletop = function(k, tab, callback) {
      Tabletop.init({
        key: k,
        callback: function(data, tabletop) {
          if(callback && typeof(callback) === "function") {
            $rootScope.$apply(function() {
              callback(data);
            })
          }
        },
        simpleSheet: false,
        parseNumbers: true
      })
    }

    


    return factory;
  });
