const axios = require("axios")


function handleMessage(sender_psid, received_message) {

    let response;

    // Checks if the message contains text
    if (received_message.text) {

        // Creates the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
        }

    } else if (received_message.attachments) {

        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload": "yes",
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no",
                            }
                        ],
                    }]
                }
            }
        }
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
}


function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    } else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}



// Send the HTTP request to the Messenger Platform
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }


    const params = {
        access_token: process.env.VERIFY_TOKEN_WEBHOOK,
    };


    axios.post("https://graph.facebook.com/v2.6/me/messages", request_body, { params })
        .then((response) => {
            // Xử lý phản hồi thành công
            console.log('Message sent!', response.data);
        })
        .catch((error) => {
            // Xử lý lỗi
            console.error('Unable to send message:', error);
        });
}


module.exports = {
    handleMessage,
    handlePostback
}