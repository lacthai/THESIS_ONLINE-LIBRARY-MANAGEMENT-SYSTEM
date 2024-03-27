const UserInput = require('../models/userFeedBack');

// Create new user input
const createUserInput = async (req, res) => {
    try {
        const userInput = new UserInput(req.body);
        await userInput.save();
        res.status(201).json(userInput);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
  };
  
  // Get all user inputs
const getAllUserInput = async (req, res) => {
    try {
        const userInputs = await UserInput.find().sort('-createdAt');
        res.status(200).json(userInputs);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  };


  module.exports = { createUserInput, getAllUserInput }
  