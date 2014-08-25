
angular.module("partyBidApp")
    .controller("priceResultCtrl",function($scope,$routeParams,$location) {

        var activity = JSON.parse($routeParams.activity);
        var bid = Bid.getTokenBid(activity);

        var users = $scope.users = Bid.sortUsers(bid.users);

        var minPriceUser = Bid.findMinPriceUser(users);

        if(minPriceUser != -1){
            $scope.winUser = minPriceUser;
            $scope.mesg = "竞价成功！";
            $scope.able = true;
            $scope.result = minPriceUser;
        }else{
            $scope.mesg = "本次竞价没有胜者！";
            $scope.able = false;
        }

       if(!activity.total){
           $('#myModal').modal();
           setTimeout("$('#myModal').modal('hide')",3000);
       }


        $scope.back = function(){
            $location.path('/priceList/' + JSON.stringify(activity));
        };

        $scope.total = function(){
            $location.path('/priceTotal/' + JSON.stringify(activity));
        };

    });