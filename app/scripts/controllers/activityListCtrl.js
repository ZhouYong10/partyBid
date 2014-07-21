/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activityListCtrl',function($scope,$location){

        if(localStorage.acts){

            var acts = JSON.parse(localStorage.acts);

            $scope.acts = acts;

        }else{

            $location.path("/createActivity");

        }

    });