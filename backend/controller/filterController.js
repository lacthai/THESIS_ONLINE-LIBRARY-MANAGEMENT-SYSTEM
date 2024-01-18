const BookList = require('../models/bookScheme')
const UserDetails = require('../models/signUpModel')

const getFilterData = async (req, res) => {
  const { title, available, category, author, language, featured } = req.query
  const queryObject = {}

  if (title) {
    queryObject.title = { $regex: title, $options: 'i' }
  }

  if (available) {
    queryObject.available = available === 'true' ? true : false
  }

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }

  if (category) {
    const categories = category.split(',').map((cat) => new RegExp(cat, 'i'))
    queryObject.category = { $in: categories }
  }

  if (author) {
    queryObject.author = { $regex: author, $options: 'i' }
  }

  if (language) {
    queryObject.language = { $regex: language, $options: 'i' }
  }

  const result = await BookList.find(queryObject)

  res.status(StatusCodes.OK).json({ total: result.length, data: result })
}
const getFilterDataStudent = async (req, res) => {
  const { username, email, phone, totalRequestedBooks } = req.query
  const queryObject = {}

  if (username) {
    queryObject.username = { $regex: username, $options: 'i' }
  }
  if (email) {
    queryObject.email = { $regex: email, $options: 'i' }
  }
  if (phone) {
    queryObject.phone = { $regex: phone, $options: 'i' }
  }
  if (totalRequestedBooks) {
    queryObject.totalRequestedBooks = { $regex: totalRequestedBooks, $options: 'i' }
  }

 

  const result = await UserDetails.find(queryObject)

  res.status(StatusCodes.OK).json({ total: result.length, data: result })
}



module.exports = { getFilterData, getFilterDataStudent }

//filtering books based on  : title, available, category, author , language ,
