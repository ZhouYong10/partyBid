
function User(name,phone){

    this.name = name;
    this.phone = phone;
}

getUserNameFromMsg = function(message){

    var index = message.indexOf("+");
    if(index == -1){
        index = message.toLowerCase().indexOf("m");
        if(index == -1 ){
            return false;
        }
    }
    var userName = message.substring(index+1).replace(/^\s+|\s+$/g,"");

    return userName;
};


saveUser = function(user,houseName){

    var users = getUsers(houseName);

    users.push(user);

    localStorage.setItem(houseName,JSON.stringify(users));

    freshUsersList(houseName);
};


freshUsersList = function(houseName){

    var signUpScope = angular.element("#showUsers").scope();

    if(typeof(signUpScope.showUsers) == "function"){
        signUpScope.$apply(function(){
            signUpScope.showUsers(houseName);

        });
    }
};


getUsers = function(houseName){

    return JSON.parse(localStorage.getItem(houseName))|| [];
};


haveUser = function(user,houseName){

    var users = getUsers(houseName);

    for(var x = 0; x < users.length; x++){

        if(user.phone == users[x].phone){
            return true;
        }
    }

    return false;
};


signUpSuccess = function(user,activity){

    if(!haveUser(user,activity.name)){
        saveUser(user,activity.name);
        return true;
    }
    return false;
};


signUp = function(user){

    var messageToUser;

    var activity = haveActivityRun();

    if (activity) {

        if (signUpSuccess(user,activity)) {
            messageToUser = "恭喜，报名成功。";
        } else {
            messageToUser = "您已经报名了，不能重复报名。";
        }
    } else {
        messageToUser = "报名尚未开始，请稍候.....";
    }
    return messageToUser;
};
