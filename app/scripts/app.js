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
        .when('/activitySignUp/:activity',{
            templateUrl: 'views/activity_sign_up.html',
            controller: 'activitySignUpCtrl'
        })
        .when('/', {
          templateUrl: 'views/activity_list.html',
          controller: 'activityListCtrl'
        })
        .when('/priceList/:activity',{
            templateUrl:'/views/price_list.html',
            controller:'priceListCtrl'
        })
        .when('/priceActivity/:bid/:activity',{
            templateUrl:'/views/price_activity.html',
            controller:'priceActivityCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
