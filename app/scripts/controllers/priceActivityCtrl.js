angular.module("partyBidApp")
    .controller("priceActivityCtrl",function($scope,$routeParams,$location){

        var activity = JSON.parse($routeParams.activity);
        var bid = JSON.parse($routeParams.bid);

        $scope.activityName = activity.name;
        $scope.bidName = bid.name;


        var runActivity = Activity.getRunActivity();
        var runBid ;

        $scope.showBidUsers = function(priceBid){

            if(runActivity && runBid && activity.name == runActivity.name && bid.name == runBid.name){
                var users = priceBid.users;
            }else{
                users = bid.users;
            }
            $scope.bidUsers = users;

            $scope.signUpNum = users.length ? "(" + users.length + ")" + "人" : "";
        };

        (
            function(){

                if(runActivity){

                    runBid = Bid.getRunBid(runActivity);

                    if(runBid && activity.name == runActivity.name && runBid.name == bid.name){
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
            activity.run = Global.UP;
            activity.status = Global.PRICE;

            Bid.deleteHashKey(activity.bids);

            Bid.freshBid(bid,activity);

            $scope.start_end = "end";
            runActivity = Activity.getRunActivity();
            runBid = Bid.getRunBid(runActivity);
        };


        $scope.priceEnd = function(){
            if(confirm("确认要结束本次竞价吗？")){
                var activity = Activity.getTokenActivity();
                var bid = Bid.getTokenBid(activity);
                bid.status = Global.PRICE_END;
                activity.run = Global.DOWN;
                activity.status = Global.PRICE_END;

                Bid.deleteHashKey(activity.bids);

                Bid.freshBid(bid,activity);

                $location.path("/priceResult/" + JSON.stringify(activity));
            }
        };


        $scope.back = function(){
            $location.path("/priceList/" + JSON.stringify(activity));
        };
    });