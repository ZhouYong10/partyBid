
function User(name,phone){
    this.name = name;
    this.phone = phone;
    this.price ;
    this.priceNum;
}

User.getUsers = function(activity){
    return activity.users;
};

User.freshSignUpList = function(signUpActivity){
    var signUpScope = angular.element("#showUsers").scope();
    if(typeof(signUpScope.showUsers) == "function"){
        signUpScope.$apply(function(){
            signUpScope.showUsers(signUpActivity);
        });
    }
};

User.hadSignUp = function(signUpUser,signUpActivity){
    var users = signUpActivity.users;
    var index = findIndexById(signUpUser.phone,"phone",users);
    if(index != -1){
        return users[index];
    }
    return false;
};

User.save = function(signUpUser,signUpActivity){
    var users = signUpActivity.users;
    users.push(signUpUser);
    Activity.freshActivities(signUpActivity);
    User.freshSignUpList(signUpActivity);
};

User.signUp = function(message,userPhone,signUpActivity){
    var messageToUser;
    var signUpUser = new User(message.substring(2),userPhone);
    if(User.hadSignUp(signUpUser,signUpActivity)){
        messageToUser = "您已经报名了，不能重复报名。";
    }else{
        User.save(signUpUser,signUpActivity);
        messageToUser = "恭喜，报名成功。";
    }
    return messageToUser;
};


User.choose = function(flag,message,userPhone){
    var messageToUser;
    var tokenActivity = Activity.getTokenActivity();
    switch(flag){
        case "bm":
            if(tokenActivity && tokenActivity.status == Global.SIGN_UP){
                messageToUser = User.signUp(message,userPhone,tokenActivity);

            }else if(tokenActivity && tokenActivity.status == Global.SIGN_END){
                messageToUser = "Sorry  报名已经结束。";
            }else{
                messageToUser = "报名尚未开始，请稍等。";
            }
            break;
        case "jj":
            if(tokenActivity && Bid.getTokenBid(tokenActivity) && Bid.getTokenBid(tokenActivity).status == Global.PRICE){
                messageToUser = Bid.bid(message,userPhone,tokenActivity);
            }else if(tokenActivity && Bid.getTokenBid(tokenActivity) && Bid.getTokenBid(tokenActivity).status == Global.PRICE_END){
                messageToUser = "Sorry  竞价已经结束。";
            }else{
                messageToUser = "竞价尚未开始，请稍等。";
            }
            break;
        default:
            messageToUser = "发生错误，请检查短信格式是否正确。";
    }
    return messageToUser;
};

User.deleteHashKey = function(users){
    for(var x = 0; x < users.length; x++){
        if(users[x].$$hashKey){
            delete users[x].$$hashKey;
        }
    }
};
