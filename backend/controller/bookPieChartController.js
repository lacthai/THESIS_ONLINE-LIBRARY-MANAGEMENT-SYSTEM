const BookTransaction = require("../models/bookTransaction");

const getMostBorrowedCategories = async (req, res) => {
    try {
        // Aggregate query to count the number of transactions for each book category
        const mostBorrowedCategories = await BookTransaction.aggregate([
            { $group: { _id: "$bookCategory", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 11 },
        ]);

        // Format the data for Chart.js
        const labels = mostBorrowedCategories.map(category => category._id);
        const data = mostBorrowedCategories.map(category => category.count);

        res.status(200).json({ labels, data });
    } catch (error) {
        console.error('Error fetching most borrowed categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getMostBorrowedCategories};