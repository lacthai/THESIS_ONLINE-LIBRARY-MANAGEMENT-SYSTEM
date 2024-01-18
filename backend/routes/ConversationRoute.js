const express = require('express')
const conversationRouter = express.Router()

const {conversation, conversationDetail} = require('../controller/conversationController')

conversationRouter.route('/').post(conversation)
                                .get(conversationDetail)

module.exports = conversationRouter
