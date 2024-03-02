const BookTransaction = require("../models/bookTransaction");
const moment = require("moment");

const getMostBorrowedUsers = async (req, res) => {
    try {
        // Define the start and end date based on the requested timeframe (week, month, or year)
        let startDate, endDate;
        const timeframe = req.query.timeframe; // Assuming the timeframe is passed as a query parameter
    
        switch (timeframe) {
          case 'week':
            startDate = moment().startOf('isoWeek');
            endDate = moment().endOf('isoWeek');
            break;
          case 'month':
            startDate = moment().startOf('month');
            endDate = moment().endOf('month');
            break;
          case 'year':
            startDate = moment().startOf('year');
            endDate = moment().endOf('year');
            break;
          default:
            return res.status(400).json({ error: 'Invalid timeframe' });
        
        }
        const mostBorrowedUsers = await BookTransaction.aggregate([
          {
            $match: {
              issueDate: {
                $gte: startDate.toDate(),
                $lte: endDate.toDate()
              },
              issueStatus: 'RETURNED' // Consider only transactions with ACCEPTED status
            }
          },
          { $group: { _id: "$userId", count: { $sum: 1 },name: { $first: "$username" },
          email: { $first: "$userEmail" },} },
          { $sort: { count: -1 } },
          { $limit: 4 } // Get the top 4 most borrowed users
        ]);
    
        // Aggregate query to count the number of transactions for each user within the specified timeframe

        // Populate the userId field with user details
        const userId = mostBorrowedUsers.map((book) => book._id);
        const userTotal = mostBorrowedUsers.map((book) => book.count)
        const usernames = mostBorrowedUsers.map((book) => book.name);
        const userEmails = mostBorrowedUsers.map((book) => book.email);


        res.status(200).json({ userId, userTotal, usernames, userEmails});
      } catch (error) {
        console.error('Error fetching most borrowed users:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};

module.exports = { getMostBorrowedUsers};