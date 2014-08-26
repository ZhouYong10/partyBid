/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location,$routeParams) {

        var activity = JSON.parse($routeParams.activity);
        var runActivity = Activity.getTokenActivity();
        $scope.activityName = activity.name;
        $scope.showUsers = function(signActivity){
            if(activity.name == runActivity.name){
                runActivity = signActivity;
                var users = $scope.users = User.getUsers(signActivity);
            }else{
                var users = $scope.users = User.getUsers(activity);
            }
            $scope.signUpNum = users.length ? "(" + users.length + ")" + "人" : "";
        };

        (
            function(){
                if(runActivity && runActivity.status == Global.SIGN_UP && activity.name == runActivity.name){
                    $scope.start_end = "end";
                    activity = runActivity;
                }else if(runActivity && runActivity.status == Global.SIGN_UP && activity.name != runActivity.name){
                    $scope.start_able = true;
                }else if(runActivity && runActivity.status == Global.PRICE){
                    $scope.start_end = "end";
                    $scope.end_able = true;
                }
                $scope.showUsers(activity);
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
