const facebookController = require("../../control/facebook_controller.js")
const express = require("express")


const route = express.Router()



route.post("/webhook", facebookController.getWebHookEvent);
route.get("/webhook", facebookController.verifyWebhook);

module.exports = route


