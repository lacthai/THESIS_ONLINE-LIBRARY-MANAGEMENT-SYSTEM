const express = require("express");
const userFeedBackRouter = express.Router();

const { createUserInput, getAllUserInput} = require("../controller/userFeedBackController");


userFeedBackRouter.route("/").get(getAllUserInput).post(createUserInput);
                        

module.exports = userFeedBackRouter;