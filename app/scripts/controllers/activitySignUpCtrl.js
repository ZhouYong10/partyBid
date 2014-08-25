/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location,$routeParams) {

        var activity = JSON.parse($routeParams.activity);  //此activity不一定就是正在报名的activity
        var runActivity = Activity.getTokenActivity();

        $scope.activityName = activity.name;  //显示当前报名活动

        $scope.showUsers = function(signActivity){

            if(activity.name == runActivity.name){
                runActivity = signActivity;

                var users = $scope.users = User.getUsers(signActivity);

                $scope.signUpNum = users.length ? "(" + users.length + ")" + "人" : "";
            }else{
                var users = $scope.users = User.getUsers(activity);

                $scope.signUpNum = users.length ? "(" + users.length + ")" + "人" : "";
            }
        };

        (
            function(){

                if(runActivity && runActivity.status == Global.SIGN_UP && activity.name == runActivity.name){
                    $scope.start_end = "end";
//                    $scope.bid = true;
                    activity = runActivity;   //解决浏览器刷新问题
                }else if(runActivity && runActivity.status == Global.SIGN_UP && activity.name != runActivity.name){
                    $scope.start_able = true;
                }else if(runActivity && runActivity.status == Global.PRICE){
                    $scope.start_end = "end";
                    $scope.end_able = true;
                }
                $scope.showUsers(activity);
//                var signUpActivity = Activity.findByStatus(Global.SIGN_UP);
//                var priceActivity = Activity.findByStatus(Global.PRICE);
//
//                if(signUpActivity || priceActivity){
//
//                    if(activity.status == Global.SIGN_UP){
//
//                        activity = signUpActivity;  //解决浏览器刷新的问题
//
//                        $scope.start_end = "end";
//
//                    }else if(activity.status == Global.PRICE){
//                        $scope.start_end = "end"
//                        $scope.end_able = true;
//                    }else if(activity.users.length == 0){
//                        $scope.bid = true;
//                    }else{
//                        $scope.start_able = true;
//                    }
//                }else if(activity.users.length == 0){
//                    $scope.bid = true;
//                }
//                $scope.showUsers(activity);
            }
        )();

        $scope.start = function(){

            activity.status = Global.SIGN_UP;
            activity.run = Global.UP;

            Activity.freshActivities(activity);
            $scope.start_end = "end" ;

            $scope.bid = true;
        };

        $scope.end = function(){

            if(confirm("确认要结束本次报名吗？")) {

                runActivity.status = Global.SIGN_END;
                runActivity.run = Global.DOWN;

                User.deleteHashKey(runActivity.users);
                Activity.freshActivities(runActivity);

                $location.path("/priceList/" + JSON.stringify(runActivity));
            }
        };


        $scope.bidList = function(){

            User.deleteHashKey(activity.users);
            $location.path("/priceList/" + JSON.stringify(activity));
        };







    });
