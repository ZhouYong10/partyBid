/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location) {

        var activity ;

        (
            function(){
                activity = getActivityByHouseName(Global.READY_RUN);

                if(haveActivityRun()){
                    if(isTheRun(activity)){
                        $scope.start_end = "end";
                        return;
                    }
                    $scope.able = true;
                }
            }
            )();



        $scope.start = function(){

            saveActivity(activity,Global.RUN);

            $scope.start_end = "end" ;
        };

        $scope.end = function(){


        };

    });
