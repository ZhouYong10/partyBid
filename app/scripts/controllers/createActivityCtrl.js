/**
 * Created by zhouyong on 14-7-19.
 */
angular.module("partyBidApp")
    .controller('createActivityCtrl',function($scope,$location){
        var acts ;

        if(localStorage.acts){  //如果存在活动，就显示返回按钮，并获取活动数组

            $scope.back = "返回";

            acts = JSON.parse(localStorage.acts);

        }else{  //如果不存在活动，就隐藏返回按钮，创建一个活动数组

            $scope.back = "";

            acts = new Array();
        }

        $scope.createAct = function(){   //绑定创建活动按钮

            var actName = $scope.actName;

            if(actName){  //如果用户输入了活动名称，就创建相应的活动

                for(x = 0; x < acts.length; x++){
                    
                    if(acts[x].name == actName){

                        $scope.message = "活动名称已经存在，请重新输入";
                        break;
                    }else{

                        var act = {"name": actName};

                        acts.unshift(act);

                        localStorage.acts = JSON.stringify(acts);

                        $location.path("/activityList");

                    }
                }

            }else{   //活动名称为空，就弹出提示框

                alert("活动名不能为空。请输入活动名称！");

            }

        };
    });