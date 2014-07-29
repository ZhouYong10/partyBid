/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location) {

        if (!localStorage.activities) {
            $location.path("/createActivity");
        }

        //报名按钮初始化为：开始
        $scope.startEnd = "开始";


        //开始报名或结束报名
        $scope.start_end = function(){

            var startEnd = document.getElementById("startEnd");

            with(startEnd){

                if($scope.startEnd == "开始"){//开始活动

                    $scope.startEnd = "结束";
                    blur();  //按钮失去焦点

                    //开始接受报名，设置活动标记为开始
                    localStorage.activity_status = "start" ;


                }else{//结束活动

                   var flag = confirm("确定要结束本次报名吗？");

                    if(flag){

                        //结束报名，设置活动标记为结束
                        localStorage.activity_status = "end" ;


                        $scope.startEnd = "开始";
                        blur();
                        return;
                    }

                    blur();

                }
            }
        }

    });
