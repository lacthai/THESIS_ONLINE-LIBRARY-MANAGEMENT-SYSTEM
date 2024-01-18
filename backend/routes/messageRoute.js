const express = require('express')
const messageRouter = express.Router()

const {message, messageDetail} = require('../controller/messagesController')

messageRouter.route('/').post(message)
                        .get(messageDetail)

module.exports = messageRouter
