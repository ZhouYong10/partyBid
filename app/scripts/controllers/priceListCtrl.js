
angular.module("partyBidApp")
    .controller("priceListCtrl",function($scope,$location,$routeParams){

        var activity = JSON.parse($routeParams.activity);  //通过报名结束过来的activity数据不是最新的。
        $scope.activityName = activity.name;
        $scope.bids = activity.bids;

        (
            function(){

                var tokenActivity = Activity.getTokenActivity();
                if(activity.name == tokenActivity.name){  //解决上面数据不同步的问题。
                    activity = tokenActivity;
                }

//                var runActivity = Activity.getRunActivity();
                if(activity.users.length == 0){
                    $scope.able = true;
                }
//                if(activity) {
//                    $scope.activityName = activity.name;
//
//                    var priceActivity = Activity.findByStatus(Global.PRICE);
//
//                    if(priceActivity && (priceActivity.name == activity.name)){
//
//                        if (Bid.getRunBid(activity)) {
//                            $scope.able = true;
//                        }
//                    }
//                    $scope.bids = activity.bids;
//                }else{
//                    $location.pathac("/activityList");
//                }
            }
        )();

        $scope.createBid = function(){

            var bid = new Bid(activity.bids.length + 1);

            if(!Bid.getRunBid(activity)){
                bid = Bid.getToken(activity,bid);
            }

            Bid.deleteHashKey(activity.bids);

            activity.bids.unshift(bid);

            Activity.freshActivities(activity);

            $location.path("/priceActivity/" + JSON.stringify(bid) + "/" + JSON.stringify(activity));
        };

        $scope.bidInfo = function(bid){

            Bid.deleteHashKey(activity.bids);

            var tokenBid = bid;
            if(!Bid.getRunBid(activity)){
                tokenBid = Bid.getToken(activity,bid);
            }

            $location.path("/priceActivity/" + JSON.stringify(tokenBid) + "/" + JSON.stringify(activity));
        };
    });