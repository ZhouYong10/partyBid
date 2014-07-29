

function Activity(name){

    this.name = name;

}

Activity.prototype.getName = function(){


};


Activity.prototype.setName = function(activity_name){


};


Activity.prototype.start = function(user){

    //定义一个变量，接收存入的所有报名信息
    var user_infos ;

    //获取报名者的姓名和号码
    var user_name = json_message.messages[0].message;
    var user_phone = json_message.messages[0].phone;

    var user_info = {
        "name":user_name,
        "phone":user_phone
    };

    //判断是否已经有报名者信息，如果有报名者信息，则遍历信息是否重复
    if(localStorage.user_info){
        user_infos = JSON.parse(localStorage.user_info);
        //遍历报名者信息
        for(var x = 0; x < user_infos.length; x++){
            //报名信息重复，反馈用户已经报名
            if(user_phone == user_infos[x]){
                messageToUser = "您已经报名，不能重复报名。";
                return;
            }
        }
    }

    //不存在报名信息，将报名信息直接存入
    user_infos = new Array();
    user_infos.unshift(user_info);

    this.send_sms(user_phone,messageToUser);

};


Activity.prototype.end = function(user){

};


Activity.prototype.no_start = function(user){

};


Activity.prototype.create = function(){

    var flag = false ;

    var activities ;

    if(localStorage.activities){
        activities = JSON.parse(localStorage.activities);
    }else{
        activities = new Array();
    }

    if(!this.name_exist(activities)){

        activities.unshift(this);

        localStorage.activities = JSON.stringify(activities);

        flag = true ;
    }

    return flag ;
};


Activity.prototype.name_exist = function(activities){

    var flag = false ;

    for(var x = 0; x < activities.length; x++){

        if(this.name == activities[x].name){

            flag = true;
            break;
        }
    }

    return flag;

}


Activity.prototype.remove = function(activity_name){


};

