//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键","phone":"18733171780"}]})
//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"jj308","phone":"18733171780"}]})
var native_accessor = {

    send_sms: function (phone, message) {
//        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});

        console.log(phone, message);
    },


    receive_message: function (json_message) {

            this.process_received_message(json_message);

    },


    process_received_message: function (json_message) {

        var messageToUser ;

        //获取活动是否开始标记
        var status = localStorage.activity_status;

        switch(status){

            case "start":
                activity_start();
                messageToUser = "恭喜，报名成功。";
                break;
            case "end":
                activity_end();
                messageToUser = "活动已经结束，请等待下一次报名。";
                break;
            default:
                activity_no_start();
                messageToUser = "活动还没有开始，请等待.....";
        }

    }


};




function notify_message_received(message_json) {
    //console.log(JSON.stringify(message_json));
    //JSON.stringify(message_json);
    //alert(JSON.stringify(message_json.messages));


    native_accessor.receive_message(message_json);
    //phone_number=message_json.messages[0].phone;
}









