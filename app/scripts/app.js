'use strict';

/**
 * @ngdoc overview
 * @name partyBidApp
 * @description
 * # partyBidApp
 *
 * Main module of the application.
 */
angular
  .module('partyBidApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/createActivity',{
            templateUrl:'views/create_activity.html',
            controller:'createActivityCtrl'
        })
        .when('/activityList',{
            templateUrl:'views/activity_list.html',
            controller:'activityListCtrl'
        })
        .when('/activitySignUp',{
            templateUrl: 'views/activity_sign_up.html',
            controller: 'activitySignUpCtrl'
        })
      .when('/', {
        templateUrl: 'views/activity_list.html',
        controller: 'activityListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
