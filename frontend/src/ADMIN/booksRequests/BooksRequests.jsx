import React, { useEffect } from 'react'
import { backend_server } from '../../main'
import axios from 'axios'
import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { debounce } from 'lodash';

const BooksRequests = () => {
  const Pending_Book_API_Url = `${backend_server}/api/v1/requestBooks`

  const [pendingBooks, setPendingBooks] = useState([])
  const [bookIssueStatus, setBookIssueStatus] = useState()
  const [isAnyBooksPending, setIsAnyBooksPending] = useState(true)
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  const fetchPendingBooks = async () => {
    try {
      const response = await axios.get(Pending_Book_API_Url)
      const totalHits = response.data.totalHits
      if (totalHits == 0) {
        setIsAnyBooksPending(false)
      } else {
        setPendingBooks(response.data.data)
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchPendingBooks()
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  const handleFormUpdate = async (transactionId) => {
    try {
      const response = await axios.patch(Pending_Book_API_Url, {
        id: transactionId,
        issueStatus: bookIssueStatus,
      })
      toast.success('Update Success')
      fetchPendingBooks()
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleSelectChange = (e) => {
    const selectedIssueStatus = e.target.value
    setBookIssueStatus(selectedIssueStatus)
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
      setFilteredBooks(pendingBooks);
    } else {
      const filteredData = pendingBooks.filter(
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

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchQuery ? filteredBooks.slice(indexOfFirstItem, indexOfLastItem) : pendingBooks.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-2 h-[120vh] px-8'>
      <h1 className='h1 text-center dark:text-[#303030] text-[#e0e0e0]'>Books Request's</h1>
      {isAnyBooksPending ? (
        pendingBooks.length > 0 ? (
          <div className='row mt-3'>
            <input
            type='text'
            className='form-control mb-4'
            placeholder='Search by username or email'
            value={searchQuery}
            onChange={handleSearchChange}
          />
            <table className='table table-hover border-[1px] border-[#bbbbbb]'>
              <thead>
                <tr>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>No.</th>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Username</th>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Email</th>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Book</th>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Status</th>
                  <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'> Update</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((book, index) => {
                  const { _id, userEmail, bookTitle, issueStatus, username } =
                    book

                  return (
                    <tr key={_id}>
                      <th scope='row' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{index + 1}</th>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{username}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{userEmail}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{bookTitle}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{issueStatus}</td>

                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>
                        <form className='d-flex' onSubmit={handleFormSubmit}>
                          <select
                            className='form-control mx-1'
                            defaultValue={issueStatus.toUpperCase()}
                            onChange={handleSelectChange}
                          >
                            <option key='PENDING' value='PENDING'>
                              PENDING
                            </option>
                            <option key='READY' value='READY'>
                              READY to PICK
                            </option>
                            <option key='ACCEPTED' value='ACCEPTED'>
                              ACCEPTED
                            </option>
                            <option key='CANCELLED' value='CANCELLED'>
                              CANCELLED
                            </option>
                          </select>
                          <button
                            className='btn btn-success mx-1 border-none bg-[#6a5af9] dark:bg-[#4cceac]'
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
            {/* Pagination */}
            <nav>
              <ul className="pagination justify-content-center">
                {Array.from({ length: Math.ceil((searchQuery ? filteredBooks.length : pendingBooks.length) / itemsPerPage) }, (_, i) => (
                  <li key={i} className="page-item">
                    <button onClick={() => paginate(i + 1)} className="page-link">
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ) : (
          <p>Loading ...</p>
        )
      ) : (
        <p className='p text-center my-3'>0 Book Requests</p>
      )}
    </div>
  )
}

export default BooksRequests
