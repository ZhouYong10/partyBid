/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activityListCtrl',function($scope,$location){

        if(localStorage.activities){

            $scope.activities = JSON.parse(localStorage.activities);;

        }else{

            $location.path("/createActivity");

        }

    });