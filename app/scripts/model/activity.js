

function Activity(name){

    this.name = name;
    this.status = Global.NO_START;

}

getActivities = function(){

   return JSON.parse(localStorage.getItem(Global.HOUSE_ACTIVITIES)) || [] ;
};


saveActivities = function(activities){

    localStorage.setItem(Global.HOUSE_ACTIVITIES,JSON.stringify(activities));
};


createActivity = function(activity){

    var activities = getActivities();

    activities.unshift(activity);

    saveActivities(activities);
};


findIndexByName = function(activityName,activities){

    for(var x = 0; x < activities.length; x++){

        if(activityName == activities[x].name){
            return x;
        }
    }
    return -1 ;
};


activityExist = function(activity){

    var activities = getActivities();

    if(findIndexByName(activity.name,activities) != -1){

        return true;
    }

    return false;
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


getActivityByHouseName = function(houseName){
    return JSON.parse(localStorage.getItem(houseName)) || false;
};


isTheRun = function(activity){

    var activity_run = getActivityByHouseName(Global.HOUSE_RUN);
    if(activity.name == activity_run.name){
        return true;
    }
    return false;
};


haveActivityRun = function(){
    var activity = getActivityByHouseName(Global.HOUSE_RUN);

    if(activity){
        return activity;
    }
    return false;
};


freshActivitiesStatus = function(activity,status){
    var activities = getActivities();

    var index = findIndexByName(activity.name,activities);

    activities[index].status = status;

    saveActivities(activities);
};


freshActivityStatus = function(status,houseName){

    var activity = getActivityByHouseName(houseName);

    activity.status = status;

    saveActivity(activity,houseName);
};