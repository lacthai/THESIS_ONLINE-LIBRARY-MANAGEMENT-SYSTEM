import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backend_server } from '../../main'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash';


const IssuedBooks = () => {
  const NOT_RETURNED_API = `${backend_server}/api/v1/requestBooks/notreturnedbooks`

  const [notReturnedBooks, setNotReturnedBooks] = useState([])

  const [isAnyBooksIssued, setIsAnyBooksIssued] = useState(false)
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const fetchNotReturnedBooks = async () => {
    try {
      const response = await axios.get(NOT_RETURNED_API)
      setNotReturnedBooks(response.data.data)

      if (response.data.data != undefined) {
        setIsAnyBooksIssued(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchNotReturnedBooks()
  }, [])


  useEffect(() => {
    const debouncedFilter = debounce(filterBooks, 300); // Debounce filtering function
    debouncedFilter(searchQuery); // Call filtering function with the current searchQuery
    return () => {
      debouncedFilter.cancel(); // Cleanup on unmount or when searchQuery changes
    };
  }, [searchQuery]);

  const filterBooks = (query) => {
    if (!query) {
      setFilteredBooks(notReturnedBooks); // If search query is empty, display all books
    } else {
      const filteredData = notReturnedBooks.filter(
        (book) =>
          book.username.toLowerCase().includes(query.toLowerCase()) ||
          book.userEmail.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filteredData);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='container mt-2 h-[120vh] px-4'>
      <h1 className='h1 text-center dark:text-[#303030] text-[#e0e0e0]'>Issued Books</h1>

      <div className="row mt-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by user name or email"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {isAnyBooksIssued ? (
        notReturnedBooks.length > 0 ? (
          <div className='row mt-3'>
            <table className='table table-hover border-[1px] border-[#bbbbbb]'>
              <thead>
                <tr>
                  <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]' >No.</th>
                  <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]' >Book</th>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Username</th>
                  <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]' >Email</th>
                  <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]' >Issue Date</th>
                  <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]' >Return Due</th>
                  <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]' >Return Status</th>
                </tr>
              </thead>

              <tbody>
                {(searchQuery ? filteredBooks : notReturnedBooks).map((book, index) => {
                  const {
                    _id,
                    userEmail,
                    bookTitle,
                    username,
                    isReturned,
                    returnDate,
                    issueDate,
                  } = book

                  const currentDate = new Date();

                  const isOverdue = new Date(returnDate) < currentDate;

                  return (
                    <tr key={_id}>
                      <th scope='row' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{index + 1}</th>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{bookTitle}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{username}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{userEmail}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{new Date(issueDate).toDateString()}</td>
                      <td className={`bg-[#e0e0e0] dark:bg-[#ffffff] ${isOverdue ? 'text-red-500' : 'text-black'}`}>{new Date(returnDate).toDateString()}</td>
                      {isReturned ? <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Returned</td> : <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Not Returned</td>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='p text-center my-3 dark:text-[#303030] text-[#e0e0e0]'>No Issued Books Yet</p>
        )
      ) : (
        <p className='p text-center my-3 dark:text-[#303030] text-[#e0e0e0]'>No Issued Books Yet</p>
      )}
    </div>
  )
}

export default IssuedBooks
