const express = require("express");
const mostUserRouter = express.Router();

const { getMostBorrowedUsers} = require("../controller/mostUserController");


mostUserRouter.route("/").get(getMostBorrowedUsers);
                        

module.exports = mostUserRouter;