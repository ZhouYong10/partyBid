/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activityListCtrl',function($scope,$location){

        Activity.getActivities().length>0?$scope.activities = Activity.getActivities():$location.path("createActivity");

        $scope.action = function(activity){
            delete activity.$$hashKey;
            var tokenActivity = activity;
            if(!Activity.getRunActivity()){
               tokenActivity =  Activity.getToken(activity);
                tokenActivity.status = Global.NO_START;
                Activity.freshActivities(tokenActivity);
            }
            $location.path("/activitySignUp/" + JSON.stringify(tokenActivity));
        };

    });