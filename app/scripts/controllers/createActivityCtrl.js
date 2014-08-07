/**
 * Created by zhouyong on 14-7-19.
 */
angular.module("partyBidApp")
    .controller('createActivityCtrl',function($scope,$location){

        (
            function(){
                if(Activity.getActivities().length){
                    $scope.back = true;
                }else{
                    $scope.back = false;
                }
            }
        )();

        $scope.onFocus = function(){
            $scope.message = false;
        };

        $scope.create_activity = function(){

            var activity = new Activity($scope.activity_name);

            if(Activity.exist(activity)){
                $scope.message = true;
                return ;
            }
            Activity.save(activity);

            $location.path("/activitySignUp/" + JSON.stringify(activity));
        };
    });