const BookTransaction = require("../models/bookTransaction");
const moment = require("moment");

// Controller function to get the most borrowed books
const getMostBorrowedBooks = async (req, res) => {
  try {
    // Define the start and end date based on the requested timeframe (week, month, or year)
    let startDate, endDate;
    const timeframe = req.query.timeframe; // Assuming the timeframe is passed as a query parameter

    switch (timeframe) {
      case "week":
        startDate = moment().startOf("isoWeek");
        endDate = moment().endOf("isoWeek");
        break;
      case "month":
        startDate = moment().startOf("month");
        endDate = moment().endOf("month");
        break;
      case "year":
        startDate = moment().startOf("year");
        endDate = moment().endOf("year");
        break;
      default:
        return res.status(400).json({ error: "Invalid timeframe" });
    }

    // Aggregate query to count the number of transactions for each book within the specified timeframe
    const mostBorrowedBooks = await BookTransaction.aggregate([
      {
        $match: {
          issueDate: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
        },
      },
      {
        $group: {
          _id: "$bookId",
          count: { $sum: 1 },
          bookTitle: { $first: "$bookTitle" },
          bookCategory: { $first: "$bookCategory" },
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }, // Get the top 10 most borrowed books
    ]);
    // Format the data for Chart.js
    const labels = mostBorrowedBooks.map((book) => book._id);
    const data = mostBorrowedBooks.map((book) => book.count);
    const bookTitles = mostBorrowedBooks.map((book) => book.bookTitle);
    const bookCategories = mostBorrowedBooks.map((book) => book.bookCategory);

    res.status(200).json({ labels, data ,bookTitles, bookCategories});
  } catch (error) {
    console.error("Error fetching most borrowed books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { getMostBorrowedBooks };
