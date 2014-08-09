

function Activity(name){

    this.name = name;
    this.status = Global.NO_START;
    this.signUpUsers = [];

}

Activity.getActivities = function(){

   return JSON.parse(localStorage.getItem(Global.HOUSE_ACTIVITIES)) || [] ;
};


Activity.save = function(houseName,obj){

    localStorage.setItem(houseName,JSON.stringify(obj));
};


Activity.create = function(activity){

    var activities = Activity.getActivities();

    activities.unshift(activity);

    Activity.save(Global.HOUSE_ACTIVITIES,activities);
};



Activity.exist = function(activity){

    var activities = Activity.getActivities();

    if(findIndexById(activity,"name",activities) != -1){

        return true;
    }

    return false;
};


Activity.getByHouseName = function(houseName){
    return JSON.parse(localStorage.getItem(houseName)) || false;
};


Activity.haveRun = function(){
    var activity = Activity.getByHouseName(Global.HOUSE_RUN);

    if(activity){
        return activity;
    }
    return false;
};


Activity.isTheRun = function(activity){

    if(activity.status == Global.SIGN_UP){
        return true;
    }
    return false;
};



Activity.freshActivities = function(activity){
    var activities = Activity.getActivities();

    var index = findIndexById(activity,"name",activities);

    activities[index] = activity;

    Activity.save(Global.HOUSE_ACTIVITIES,activities);
};












changeStateByName = function(activityName,status){

    var activities = getActivities();

    var index = findIndexByName(activityName,activities);

    activities[index].status = status;

    saveActivities(activities);
};


saveActivity = function(activity,houseName){

    localStorage.setItem(houseName,JSON.stringify(activity));
};


removeActivity = function(houseName){
    var activity = getActivityByHouseName(houseName);

    localStorage.removeItem(houseName);

    return activity;
};








freshActivityStatus = function(status,houseName){

    var activity = getActivityByHouseName(houseName);

    activity.status = status;

    saveActivity(activity,houseName);
};