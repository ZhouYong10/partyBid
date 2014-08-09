/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activityListCtrl',function($scope,$location){

        (
            function(){
                if(Activity.getActivities().length){
                    $scope.activities = Activity.getActivities();
                }else{
                    $location.path("createActivity");
                }

//                if(Activity.findByStatus(Global.PRICE)){
//                    if(Bid.getRunBid(Activity.findByStatus(Global.PRICE))){
//                        $scope.create = true;
//                    }
//                }
            }
        )();

//        $scope.createActivity = function(){
//            $location.path("/createActivity");
//        };

        $scope.action = function(activity){
            delete activity.$$hashKey;

            var tokenActivity = activity;
            if(!Activity.getRunActivity()){
               tokenActivity =  Activity.getToken(activity);
                tokenActivity.status = Global.NO_START;
                Activity.freshActivities(tokenActivity);
            }
            $location.path("/activitySignUp/" + JSON.stringify(tokenActivity));
        };

    });