const express = require("express");
const bookChartRouter = express.Router();

const { getMostBorrowedBooks} = require("../controller/bookChartController");


bookChartRouter.route("/").get(getMostBorrowedBooks);
                        

module.exports = bookChartRouter;