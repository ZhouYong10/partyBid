/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location) {

        if (!localStorage.acts) {
            $location.path("/createActivity");
        }

        $scope.startEnd = "开始";

        $scope.start_end = function(){

            if($scope.startEnd == "开始"){

                $scope.startEnd = "结束";
                document.getElementById("startEnd").blur();

            }else{

                

            }
        }

    });
