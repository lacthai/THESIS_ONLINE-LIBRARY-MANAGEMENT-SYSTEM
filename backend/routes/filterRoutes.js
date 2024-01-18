const express = require('express')
const filterRouter = express.Router()

const { getFilterData, getFilterDataStudent } = require('../controller/filterController')

filterRouter.route('/').get(getFilterData).get(getFilterDataStudent)

module.exports = filterRouter
