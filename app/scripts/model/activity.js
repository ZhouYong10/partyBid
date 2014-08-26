
function Activity(name){
    this.name = name;
    this.token = Global.DOWN ;
    this.run = Global.DOWN;
    this.status = Global.NO_START;
    this.users = [];
    this.bids = [];
}

Activity.getToken = function(activity){
    var activities = Activity.getActivities();
    for(var x = 0; x < activities.length; x++){
        activities[x].token = Global.DOWN;
    }
    var index = findIndexById(activity.name,"name",activities);
    if(index != -1){
        activities[index].token = Global.UP;
        Activity.saveActivities(activities);
        return activities[index];
    }else{
        activity.token = Global.UP;
        Activity.saveActivities(activities);
        return activity;
    }
};

Activity.getTokenActivity = function(){
    var activities = Activity.getActivities();
    var index = findIndexById(Global.UP,"token",activities);
    if(index != -1){
        return activities[index];
    }
    return false;
};


Activity.getActivities = function(){
    return JSON.parse(localStorage.getItem(Global.HOUSE_ACTIVITIES)) || [];
};

Activity.saveActivities = function(activities){
    localStorage.setItem(Global.HOUSE_ACTIVITIES,JSON.stringify(activities));
};

Activity.exist = function(activity){
    var activities = Activity.getActivities();
    if(findIndexById(activity.name,"name",activities) != -1){
        return true;
    }
    return false;
};

Activity.save = function(activity){
    var activities = Activity.getActivities();
    var index = findIndexById(activity.name,"name",activities);
    if(index != -1){
        activities[index] = activity;
    }else{
        activities.unshift(activity);
    }
    Activity.saveActivities(activities);
};

Activity.findByStatus = function(status){
    var activities = Activity.getActivities();
    var index = findIndexById(status,"status",activities);
    if(index != -1){
        return activities[index];
    }
    return false;
};

Activity.getRunActivity = function(){
   var activities = Activity.getActivities();
    for(var x = 0; x < activities.length; x++){
        if(activities[x].run == Global.UP){
            return activities[x];
        }
    }
    return false;
};

Activity.freshActivities = function(activity){
    var activities = Activity.getActivities();
    var index = findIndexById(activity.name,"name",activities);
    activities[index] = activity;
    Activity.saveActivities(activities);
};
