import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { backend_server } from '../../main'
import { debounce } from 'lodash'


const ReturnedBooks = () => {
  const NOT_RETURNED_API = `${backend_server}/api/v1/requestBooks/notreturnedbooks`
  const Update_Return_Status_API = `${backend_server}/api/v1/requestBooks`

  const [notReturnedBooks, setNotReturnedBooks] = useState([])

  // Stored selected return Status from FORM
  const [bookReturnStatus, setBookReturnStatus] = useState()
  const [isAnyBooksPending, setIsAnyBooksPending] = useState(false)
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const fetchNotReturnedBooks = async () => {
    try {
      const response = await axios.get(NOT_RETURNED_API)

      if (response.data.data.length > 0) {
        setIsAnyBooksPending(true)
      } else {
        setIsAnyBooksPending(false)
      }
      setNotReturnedBooks(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchNotReturnedBooks()
  }, [])

  // FORM
  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  const handleFormUpdate = async (transactionId) => {
    const updateReturnStatus = bookReturnStatus === 'true' ? true : false

    try {
      await axios.patch(Update_Return_Status_API, {
        id: transactionId,
        isReturned: updateReturnStatus,
      })
      toast.success('Update Success')

      fetchNotReturnedBooks()
    } catch (error) {
      console.log(error)
      console.log(error.response)
    }
  }

  const handleSelectChange = (e) => {
    const selectedReturnStatus = e.target.value
    setBookReturnStatus(selectedReturnStatus)
  }

  useEffect(() => {
    const debouncedFilter = debounce(filterBooks, 300);
    debouncedFilter(searchQuery);
    return () => {
      debouncedFilter.cancel();
    };
  }, [searchQuery]);

  const filterBooks = (query) => {
    if (query.trim() === '') {
      setFilteredBooks(notReturnedBooks); // Show all books if no search query
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
      <h1 className='h1 text-center dark:text-[#303030] text-[#e0e0e0]'>Return Due Books</h1>
      {isAnyBooksPending ? (
        notReturnedBooks.length > 0 ? (
          <div className='row mt-3'>
             <input
            type="text"
            className="form-control mb-4"
            placeholder="Search by user name or email"
            value={searchQuery}
            onChange={handleSearchChange}
          />
            <table className='table table-hover border-[1px] border-[#bbbbbb]'>
              <thead>
                <tr>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>No.</th>
                  <th scope='col'>Username</th>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Email</th>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Book</th>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Return Due</th>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Return Status</th>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'> Update</th>
                </tr>
              </thead>

              <tbody>
                {(searchQuery.trim() === '' ? notReturnedBooks : filteredBooks).map((book, index) => {
                  const {
                    _id,
                    userEmail,
                    bookTitle,
                    username,
                    isReturned,
                    returnDate,
                    
                  } = book

                  return (
                    <tr key={_id}>
                      <th scope='row' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{index + 1}</th>
                      <td>{username}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{userEmail}</td>
                      <td style={{ width: '250px' }} className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{bookTitle}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{new Date(returnDate).toDateString()}</td>
                      {isReturned ? <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Returned</td> : <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Not Returned</td>}

                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>
                        <form className='d-flex' onSubmit={handleFormSubmit}>
                          <select
                            className='form-control mx-1'
                            defaultValue='false'
                            onChange={handleSelectChange}
                          >
                            <option key='false' value='false'>
                              Not Returned
                            </option>
                            <option key='true' value='true'>
                              Returned
                            </option>
                          </select>
                          <button
                            className='btn btn-success mx-1 bg-[#6a5af9] dark:bg-[#4cceac] border-none'
                            onClick={() => handleFormUpdate(_id)}
                          >
                            Update
                          </button>
                        </form>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading ...</p>
        )
      ) : (
        <p className='p text-center my-3'>0 Book's left to RETURN</p>
      )}
    </div>
  )
}

export default ReturnedBooks
