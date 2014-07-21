/**
 * Created by zhouyong on 14-7-19.
 */
angular.module('partyBidApp')
    .controller('activitySignUpCtrl',function($scope,$location){

        if(!localStorage.acts){
            $location.path("/createActivity");
        }

    });
