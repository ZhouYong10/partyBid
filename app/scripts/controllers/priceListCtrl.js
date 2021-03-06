
angular.module("partyBidApp")
    .controller("priceListCtrl",function($scope,$location,$routeParams){

        var activity = JSON.parse($routeParams.activity);
        $scope.activityName = activity.name;
        $scope.bids = activity.bids;

        (
            function(){
                var tokenActivity = Activity.getTokenActivity();
                if(activity.name == tokenActivity.name){
                    activity = tokenActivity;
                }
                if(activity.users.length == 0){
                    $scope.able = true;
                }
            }
        )();

        $scope.createBid = function(){
            var bid = new Bid(activity.bids.length + 1);
            if(!Bid.getRunBid(activity)){
                bid = Bid.getToken(activity,bid);
                bid.status = Global.PRICE;
                activity.run = Global.UP;
                activity.status = Global.PRICE;
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

        $scope.signUp = function(){
            $location.path('/activitySignUp/' + JSON.stringify(activity));
        };
    });