
angular.module("partyBidApp")
    .controller("priceListCtrl",function($scope,$location,$routeParams){

        var activity = JSON.parse($routeParams.activity);

        (
            function(){
                if(activity) {
                    $scope.activityName = activity.name;

                    if (Bid.hadBid(activity) || Activity.findByStatus(Global.PRICE)) {
                        $scope.able = true;
                    }
                    $scope.bids = activity.bids;
                }else{
                    $location.pathac("/activityList");
                }
            }
        )();

        $scope.createBid = function(){

            var bid = new Bid(activity.bids.length + 1);

            Bid.deleteHashKey(activity.bids);

            activity.bids.unshift(bid);

            Activity.freshActivities(activity);

            $location.path("/priceActivity/" + JSON.stringify(bid) + "/" + JSON.stringify(activity));
        };

        $scope.bidInfo = function(bid){
            delete bid.$$hashKey;
            $location.path("/priceActivity/" + JSON.stringify(bid) + "/" + JSON.stringify(activity));
        };
    });