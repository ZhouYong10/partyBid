
function User(name,phone){

    this.name = name;
    this.phone = phone;
    this.price ;
    this.priceNum;
}

User.getUsers = function(activity){
    return activity.users;
};

User.hadSignUp = function(signUpUser,signUpActivity){

    var users = signUpActivity.users;

    var index = findIndexById(signUpUser.phone,"phone",users);

    if(index != -1){
        return users[index];
    }
    return false;
};

User.freshSignUpList = function(signUpActivity){
    var signUpScope = angular.element("#showUsers").scope();

    if(typeof(signUpScope.showUsers) == "function"){

        signUpScope.$apply(function(){

            signUpScope.showUsers(signUpActivity);
        });
    }
};

User.save = function(signUpUser,signUpActivity){

    var users = signUpActivity.users;

    users.push(signUpUser);

    Activity.freshActivities(signUpActivity);

    User.freshSignUpList(signUpActivity);
};

User.signUp = function(signUpUser,signUpActivity){
    var messageToUser;

    if(User.hadSignUp(signUpUser,signUpActivity)){
        messageToUser = "您已经报名了，不能重复报名。";
    }else{
        User.save(signUpUser,signUpActivity);
        messageToUser = "恭喜，报名成功。";
    }
    return messageToUser;
};

User.readySignUp = function(name,userPhone){
    var messageToUser;

    var signUpActivity = Activity.findByStatus(Global.SIGN_UP);

    if(signUpActivity){

        var signUpUser = new User(name,userPhone);

        messageToUser = User.signUp(signUpUser,signUpActivity);

    }else if(Activity.findByStatus(Global.PRICE)){

        messageToUser = "Sorry  报名已经结束，请等待下一次报名。";

    }else{

        messageToUser = "报名尚未开始，请稍等。";
    }
    return messageToUser;
};



























/*


getUsers = function(activity){

    return activity.users;
};


freshUsersList = function(activity){

    var signUpScope = angular.element("#showUsers").scope();

    if(typeof(signUpScope.showUsers) == "function"){
        signUpScope.$apply(function(){
            signUpScope.showUsers(activity);

        });
    }
};


saveUser = function(user,activity){

    var users = getUsers(activity);

    users.push(user);

    activity.users = users;

    freshActivities(activity);

    freshUsersList(activity);
};


haveUser = function(user,activity){

    var users = getUsers(activity);

    for(var x = 0; x < users.length; x++){

        if(user.phone == users[x].phone){
            return users[x];
        }
    }

    return false;
};


signUpSuccess = function(user,activity){

    if(!haveUser(user,activity)){
        saveUser(user,activity);
        return true;
    }
    return false;
};

*/



































