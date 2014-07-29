/**
 * Created by zhouyong on 14-7-19.
 */
angular.module("partyBidApp")
    .controller('createActivityCtrl',function($scope,$location){

        if(localStorage.activities){
            $scope.back = true;
        }else{
            $scope.back = false;
        }

        $scope.onFocus = function(){
            $scope.message = false;
        }


        //绑定创建活动按钮
        $scope.create_activity = function(){

            var activity_name = $scope.activity_name;

            var activity = new Activity(activity_name);

            if(activity.create()){
                $location.path("/activityList");
            }else{
                $scope.message = true;
            }

        };
    });