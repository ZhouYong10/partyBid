/**
 * Created by zhouyong on 14-7-19.
 */
angular.module("partyBidApp")
    .controller('createActivityCtrl',function($scope,$location){

        if(localStorage.getItem(Global.HOUSE_ACTIVITIES)){
            $scope.back = true;
        }else{
            $scope.back = false;
        }

        $scope.onFocus = function(){
            $scope.message = false;
        };


        //绑定创建活动按钮
        $scope.create_activity = function(){

            var activity = new Activity($scope.activity_name);

            if(activityExist(activity)){
                $scope.message = true;
                return ;
            }
            createActivity(activity);
            saveActivity(activity,Global.HOUSE_READY_RUN);
            $location.path("/activitySignUp");
        };
    });