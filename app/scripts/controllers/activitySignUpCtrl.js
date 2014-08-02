/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location) {

        $scope.showUsers = function(houseName){

            var users = $scope.users = getUsers(houseName);

            $scope.signUpNum = users.length ? "(" + users.length + ")" + "人" : "";
        };


        var activity ;
        (
            function(){

                if(haveActivityRun()){

                    activity = getActivityByHouseName(Global.HOUSE_RUN);

                    if(isTheRun(getActivityByHouseName(Global.HOUSE_READY_RUN))){
                        $scope.showUsers(activity.name);
                        $scope.start_end = "end";
                    }else{
                        $scope.able = true;
                        $scope.showUsers(getActivityByHouseName(Global.HOUSE_READY_RUN).name);
                    }

                }else{
                    activity = getActivityByHouseName(Global.HOUSE_READY_RUN);
                    $scope.showUsers(activity.name);
                }
            }
        )();

        $scope.start = function(){

            activity.status = Global.START;

            saveActivity(activity,Global.HOUSE_RUN);

            freshActivitiesStatus(activity,Global.START);

            $scope.start_end = "end" ;
        };

        $scope.end = function(){

            if(confirm("确认要结束本次报名吗？")){

                $scope.able = true ;

                removeActivity(Global.HOUSE_RUN);

                freshActivitiesStatus(activity,Global.NO_START);

                $location.path("/priceList");
            }
        };


    });
