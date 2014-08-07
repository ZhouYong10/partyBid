//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键","phone":"18733171780"}]})
//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"jj308","phone":"18733171780"},{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键","phone":"18733171720"}]})
var native_accessor = {

    send_sms: function (phone, message) {
//        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});

        console.log(phone, message);
    },

    receive_message: function (json_message) {
        this.process_received_message(json_message);
    },

    process_received_message: function (json_message) {
        var messageToUser;
        var userPhone;
        var messages = json_message.messages;
        var message;
        for(var x = 0; x < messages.length; x++){

            userPhone = messages[x].phone;

            message = messages[x].message.replace(/\s+/g,"");

            if(message.substring(0,2).toLowerCase() == "bm"){

               messageToUser = User.readySignUp(message.substring(2),userPhone);

            }else if(message.substring(0,2).toLowerCase() == "jj"){

                messageToUser = Bid.readyBid(message.substring(2),userPhone);
            }else{
                messageToUser = "发生错误，请检查短信格式是否正确。";
            }
        }
        this.send_sms(userPhone, messageToUser);
    }
};


function notify_message_received(message_json) {
    //console.log(JSON.stringify(message_json));
    //JSON.stringify(message_json);
    //alert(JSON.stringify(message_json.messages));

    native_accessor.receive_message(message_json);
    //phone_number=message_json.messages[0].phone;
}









