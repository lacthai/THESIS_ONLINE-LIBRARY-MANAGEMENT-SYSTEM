import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backend_server } from '../../main';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

const IssuedBooks = () => {
  const NOT_RETURNED_API = `${backend_server}/api/v1/requestBooks/notreturnedbooks`;

  const [notReturnedBooks, setNotReturnedBooks] = useState([]);
  const [isAnyBooksIssued, setIsAnyBooksIssued] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  const fetchNotReturnedBooks = async () => {
    try {
      const response = await axios.get(NOT_RETURNED_API);
      setNotReturnedBooks(response.data.data);
      if (response.data.data !== undefined) {
        setIsAnyBooksIssued(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotReturnedBooks();
  }, []);

  useEffect(() => {
    const debouncedFilter = debounce(filterBooks, 300);
    debouncedFilter(searchQuery);
    return () => {
      debouncedFilter.cancel();
    };
  }, [searchQuery]);

  useEffect(() => {
    // Reset current page when search query changes
    setCurrentPage(1);
  }, [searchQuery]);

  const filterBooks = (query) => {
    setSearchQuery(query);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    filterBooks(query);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBooks = searchQuery ? notReturnedBooks.filter(book =>
    book.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem) : notReturnedBooks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                {currentBooks.map((book, index) => {
                  const {
                    _id,
                    userEmail,
                    bookTitle,
                    username,
                    isReturned,
                    returnDate,
                    issueDate,
                  } = book;

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
                  );
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

      {/* Pagination controls */}
      {notReturnedBooks.length > itemsPerPage && (
        <ul className="pagination justify-content-center mt-3">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          </li>
          {[...Array(Math.ceil(notReturnedBooks.length / itemsPerPage))].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(notReturnedBooks.length / itemsPerPage) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default IssuedBooks;
