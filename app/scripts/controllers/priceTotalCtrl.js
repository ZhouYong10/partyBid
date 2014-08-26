
angular.module("partyBidApp")
    .controller("priceTotalCtrl",function($scope,$routeParams,$location) {
        var activity = JSON.parse($routeParams.activity);
        var bid = Bid.getTokenBid(activity);
        $scope.users = bid.users;
        var total = Bid.total(bid);
        $scope.total = total;
        $scope.result = function(){
            activity.total = "total";
            $location.path('/priceResult/' + JSON.stringify(activity));
        };

        $scope.priceList = function(){
            $location.path('/priceList/' + JSON.stringify(activity));
        };
    });