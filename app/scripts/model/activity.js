

function Activity(name){

    this.name = name;
    this.status = Global.NO_START;

}

getActivities = function(){

   return JSON.parse(localStorage.getItem("activities")) || [] ;
};


saveActivities = function(activities){

    localStorage.activities = JSON.stringify(activities);
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

    var flag = false ;

    var activities = getActivities();

    if(findIndexByName(activity.name,activities) != -1){

        flag = true;
    }

    return flag;
};


changeStateByName = function(activityName,status){

    var activities = getActivities();

    var index = findIndexByName(activityName,activities);

    activities[index].status = status;

    saveActivities(activities);
};


saveActivity = function(activity,saveName){

    localStorage.setItem(saveName,JSON.stringify(activity));
};


getActivityByHouseName = function(houseName){
    return JSON.parse(localStorage.getItem(houseName));
};


isTheRun = function(activity){

    var activity_run = getActivityByHouseName(Global.RUN);
    if(activity.name == activity_run.name){
        return true;
    }
    return false;
};


haveActivityRun = function(){

    if(getActivityByHouseName(Global.RUN)){
        return true;
    }
    return false;
}