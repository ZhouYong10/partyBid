/**
 * Created by zhouyong on 14-7-19.
 */
angular.module("partyBidApp")
    .controller('createActivityCtrl',function($scope,$location){

        Activity.getActivities().length>0? $scope.back = true:$scope.back = false;

        $scope.onFocus = function(){
            $scope.message = false;
        };

        $scope.create_activity = function(){
            var activity = new Activity($scope.activity_name);
            if(Activity.exist(activity)){
                $scope.message = true;
                return ;
            }
            if(!Activity.getRunActivity()){
               activity = Activity.getToken(activity);
            }
            Activity.save(activity);
            $location.path("/activitySignUp/" + JSON.stringify(activity));
        };
    });