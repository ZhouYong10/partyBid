
function Bid(num){
    this.token = Global.DOWN ;
    this.name = "竞价     " + num;
    this.users = [];
    this.status = Global.NO_START;
}

Bid.getToken = function(activity,bid){
    var bids = activity.bids;
    for(var x = 0; x < bids.length; x++){
        bids[x].token = Global.DOWN;
    }
    var index = findIndexById(bid.name,"name",bids);
    if(index != -1){
        bids[index].token = Global.UP;
        Activity.save(activity);
        return bids[index];
    }else{
        bid.token = Global.UP;
        Activity.save(activity);
        return bid;
    }
};

Bid.getTokenBid = function(activity){
    var bids = activity.bids;
    var index = findIndexById(Global.UP,"token",bids);
    if(index != -1){
        return bids[index];
    }
    return false;
};

Bid.freshBidList = function(bid){
    var scope = angular.element("#showBidUsers").scope();
    if(typeof scope.showBidUsers == "function"){
        scope.$apply(function(){
            scope.showBidUsers(bid);
        });
    }
};

Bid.getRunBid = function(activity){
    var bids = activity.bids;
    var index = findIndexById(Global.PRICE, "status", bids);
    if (index != -1) {
        return bids[index];
    }
    return false;
};

Bid.hadPrice = function(user,bid){
    var users = bid.users;
    var index = findIndexById(user.phone,"phone",users);
    if(index != -1){
        return users[index];
    }
    return false;
};

Bid.bid = function(message,userPhone,activity){
    var messageToUser;
    var signUpUser = User.hadSignUp(new User("",userPhone),activity);
    var tokenBid = Bid.getTokenBid(activity);
    if(signUpUser){
        if(Bid.hadPrice(signUpUser,tokenBid)){
            messageToUser = "您已经出价了，不能重复出价。";
        }else{
            var priceUser = new User(signUpUser.name,signUpUser.phone);
            priceUser.priceNum = tokenBid.users.length + 1;
            priceUser.price = message.substring(2);
            tokenBid.users.push(priceUser);
            Bid.freshBidList(tokenBid);
            Activity.freshActivities(activity);
            messageToUser = "恭喜，出价成功。";
        }
    }else{
        messageToUser = "Sorry  您没有报名，不能参与竞价。";
    }
    return messageToUser;
};


Bid.freshBid = function(bid,activity){
    var bids = activity.bids;
    var index = findIndexById(bid.name,"name",bids)
    bids[index] = bid;
    Activity.freshActivities(activity);
};

Bid.deleteHashKey = function(bids){
    for(var x = 0; x < bids.length; x++){
        if(bids[x].$$hashKey){
            delete bids[x].$$hashKey;
        }
        User.deleteHashKey(bids[x].users);
    }
};

Bid.sortUsers = function(users){
    for(var x = 0; x < users.length-1; x++){
        for(var y = x+1; y < users.length; y++){
            if(users[x]['price'] - users[y]['price'] > 0){
                var temp = users[x];
                users[x] = users[y];
                users[y] = temp;
            }
        }
    }
    return users;
};

Bid.findMinPriceUser = function(users){
    for(var x = 0; x < users.length-2; x++){
        if(x == 0 && users[x].price - users[x+1].price < 0){
           return users[x];
        }
        if(x != 0 && users[x].price - users[x+1].price < 0 && users[x+1].price - users[x+2].price < 0){
            return users[x+1];
        }
        if(x == users.length-3 && users[x+1].price - users[x+2].price < 0){
            return users[x+2];
        }
    }
    return -1;
};

Bid.total = function(bid){
    var users = bid.users;
    var total = [];
    var temp = {
        num: 1,
        price:null
    };
    for(var x = 0; x < users.length-1; x++){
        if(users[x].price == users[x+1].price){
            temp.num += 1;
        }
        if(users[x].price - users[x+1].price < 0){
            temp.price = users[x].price;
            total.push(temp);
            temp = {
                num: 1,
                price:null
            };
        }
        if(x+2 == users.length){
            temp.price = users[x+1].price;
            total.push(temp);
        }
    }
    return total;
};
