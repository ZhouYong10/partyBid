/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activityListCtrl',function($scope,$location){

        if(localStorage.activities){
            $scope.activities = getActivities();
        }else{
            $location.path("/createActivity");
        }




        $scope.action = function(activity){

            saveActivity(activity,Global.READY_RUN);
        };

    });