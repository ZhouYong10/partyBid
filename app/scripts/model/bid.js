
function Bid(num){

    this.token = Global.DOWN ;

    this.name = "竞价     " + num;
    this.users = [];
    this.status = Global.NO_START;
}

Bid.getToken = function(activity,bid){

    var bids = activity.bids;

    for(var x = 0; x < bids.length; x++){  //清除所有竞价的执行权
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
            signUpUser.priceNum = tokenBid.users.length + 1;
            tokenBid.users.push(user);

            Activity.freshActivities(activity);

            Bid.freshBidList(tokenBid);

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
    }
};












/*

Bid.readyBid = function(price,userPhone){
    var messageToUser;

    var priceActivity = Activity.findByStatus(Global.PRICE);

    if(priceActivity){

        var signUpUser = User.hadSignUp(new User("",userPhone),priceActivity);

        if(signUpUser){

            var user = new User(signUpUser.name,userPhone);
            user.price = price;

            messageToUser = Bid.bid(user,priceActivity);
        }else{
            messageToUser = "Sorry  您没有报名，不能参加竞价。";
        }
    }else{
        messageToUser = "竞价活动尚未开始，请等待。";
    }
    return messageToUser;
};*/


/*
hadSignUp = function(phone){

    var activity = findActivityByStatus(Global.PRICE);
    var user = new User("",phone);
    return haveUser(user,activity);
};


onBid = function(activity){

    var bids = activity.bids;
    for(var x = 0; x < bids.length; x++){

        if(bids[x].status == Global.PRICE ){
            return bids[x];
        }
    }
    return false;
};


bid = function(user){

    var messageToUser;
    var activity = findActivityByStatus(Global.PRICE);
    var bid = onBid(activity);

    if (bid) {
        bid.users.push(user);
        if (priceSuccess(bid)) {
            messageToUser = "恭喜，您已出价成功。";
        } else {
            messageToUser = "您已经出价了，请等待下一轮竞价";
        }
    } else {
        messageToUser = "竞价还没有开始，请稍等。";
    }
    return messageToUser;
};


priceSuccess = function(bid){

    if(typeof user.price == "undefined"){
        user.price = price;
        freshBidUsers(user,bid);
        return true;
    }
    return false;
};


freshBidUsers = function(user,bid){

    var users = bid.users;
    users[findIndexById(user.phone,"phone",user)] = user;
    var activity = findActivityByStatus(Global.PRICE);
    freshActivityBid(bid,activity);
};


freshActivityBid = function(bid,activity){

    var bids = activity.bids;
    bids[findIndexById(bid.name,"name", bids)] = bid;
    freshActivities(activity);
    showPriceActivity(bid);
};


showPriceActivity = function(bid){

    var priceActivityScope = angular.element("#showBidUsers").scope();
    if(typeof priceActivityScope.showBidUsers == "function"){

        priceActivityScope.$apply(function(){
            priceActivityScope.showBidUsers(bid);
        });
    }


};
*/


