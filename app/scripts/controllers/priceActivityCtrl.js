angular.module("partyBidApp")
    .controller("priceActivityCtrl",function($scope,$routeParams,$location){

        var activity = JSON.parse($routeParams.activity);
        var bid = JSON.parse($routeParams.bid);

        var runActivity = Activity.getRunActivity();
        var runBid ;
        if(runActivity){
            runBid = Bid.getRunBid(runActivity);
        }

        $scope.activityName = activity.name;
        $scope.bidName = bid.name;

        $scope.showBidUsers = function(priceBid){
            if(runBid && activity.name == runActivity.name && bid.name == runBid.name){
                var users = priceBid.users;
            }else if(runBid){
                users = runBid.users;
            }
            $scope.bidUsers = users;

            $scope.signUpNum = users.length ? "(" + users.length + ")" + "人" : "";
        };

        (
            function(){

                if(runActivity){

                    var runBid = Bid.getRunBid(runActivity);

                    if(runBid && runBid.name == bid.name){
                        $scope.start_end = "end";
                    }else{
                        $scope.start_able = true;
                    }
                }
                $scope.showBidUsers(bid);

//                var priceBid = Bid.getRunBid(Activity.findByStatus(Global.PRICE));
//
//                if(priceBid){
//
//                    if(bid.status == Global.PRICE){
//                        bid = priceBid;
//                        $scope.start_end = "end";
//                    }else{
//                        $scope.able = true;
//                    }
//                }
//                $scope.showBidUsers(bid);
            }
        )();


        $scope.priceStart = function(){

            bid.status = Global.PRICE;

//            var priceActivity = Activity.findByStatus(Global.PRICE);

//            $location.path("/priceActivity/" + JSON.stringify(bid) + JSON.stringify(activity)); //解决浏览器刷新问题,手机上不需要这段代码

            Bid.freshBid(bid,activity);

            $scope.start_end = "end";
        };


        $scope.priceEnd = function(){

            if(confirm("确认要结束本次竞价吗？")){
                bid.status = Global.END;

//                var priceActivity = Activity.findByStatus(Global.PRICE);

                Bid.freshBid(bid,activity);

                $location.path("/priceResult/" + JSON.stringify(activity));
            }
        };


        $scope.back = function(){

            $location.path("/priceList/" + JSON.stringify(activity));
        };
    });