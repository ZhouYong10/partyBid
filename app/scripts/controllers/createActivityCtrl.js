/**
 * Created by zhouyong on 14-7-19.
 */
angular.module("partyBidApp")
    .controller('createActivityCtrl',function($scope,$location){
        var acts ;
        var messageDis = document.getElementById("message");
        var turnBackDis = document.getElementById("turnBack");

        if(localStorage.acts){  //如果存在活动，就显示返回按钮，并获取活动数组

            turnBackDis.style.display = "";

            acts = JSON.parse(localStorage.acts);

        }else{  //如果不存在活动，就隐藏返回按钮，创建一个活动数组

            turnBackDis.style.display = "none";

            acts = new Array();
        }

        //点击输入窗口执行
        $scope.actNameOnfocus = function(){

            messageDis.style.display = "none";
            $scope.actName = "";

        }

        //创建活动
        function addAct(objs,objName){

            var act = {"name": objName};

            objs.unshift(act);

            localStorage.acts = JSON.stringify(objs);

            $location.path("/activitySignUp");
        }

        //绑定创建活动按
        $scope.createAct = function(){   //绑定创建活动按
            var actName = $scope.actName;

            if(actName){  //如果用户输入了活动名称，就创建相应的活动

                if(acts.length > 0){

                    for(x = 0; x < acts.length; x++){

                        if(acts[x].name == actName){

                            messageDis.style.display = "";
                            $scope.message = "活动名称已存在，请重新命名。";
                            return;
                        }
                    }

                   addAct(acts,actName);
                   return;

                }

                addAct(acts,actName);

            }else{   //活动名称为空，就弹出提示框

                messageDis.style.display = "";

                $scope.message = "活动名称不能为空，请输入名称。";

            }

        };
    });