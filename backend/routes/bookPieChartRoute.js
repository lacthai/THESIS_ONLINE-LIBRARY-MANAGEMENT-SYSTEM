const express = require("express");
const bookPieChartRouter = express.Router();

const { getMostBorrowedCategories} = require("../controller/bookPieChartController");


bookPieChartRouter.route("/").get(getMostBorrowedCategories);
                        

module.exports = bookPieChartRouter;