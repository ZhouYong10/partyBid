/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location,$routeParams) {

        var activity = JSON.parse($routeParams.activity);

        $scope.showUsers = function(activity){

            var users = $scope.users = User.getUsers(activity);

            $scope.signUpNum = users.length ? "(" + users.length + ")" + "人" : "";
        };

        (
            function(){

                var signUpActivity = Activity.findByStatus(Global.SIGN_UP);
                var priceActivity = Activity.findByStatus(Global.PRICE);

                if(signUpActivity || priceActivity){

                    if(activity.status == Global.SIGN_UP){

                        activity = signUpActivity;  //解决浏览器刷新的问题

                        $scope.start_end = "end";

                    }else if(activity.status == Global.PRICE){
                        $scope.start_end = "end"
                        $scope.end_able = true;
                    }else{
                        $scope.start_able = true;
                    }
                }
                $scope.showUsers(activity);
            }
        )();

        $scope.start = function(){

            activity.status = Global.SIGN_UP;

            Activity.freshActivities(activity);

            $scope.start_end = "end" ;
        };

        $scope.end = function(){

            if(confirm("确认要结束本次报名吗？")) {

                var activity = Activity.findByStatus(Global.SIGN_UP);

                activity.status = Global.PRICE;

                Activity.freshActivities(activity);

                $location.path("/priceList/" + JSON.stringify(activity));
            }
        };


        $scope.bidList = function(){

            $location.path("/priceList/" + JSON.stringify(activity));
        };







    });
