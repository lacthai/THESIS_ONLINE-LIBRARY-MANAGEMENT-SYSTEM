import React, { useState, useEffect } from 'react';
import useFetch from '../../useFetch';
import { backend_server } from '../../main';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

const ViewUsers = () => {
  const users_api = `${backend_server}/api/v1/users`;
  const [totalUsers, setTotalUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetched_data = useFetch(users_api);
  const data = fetched_data.fetched_data.data;

  useEffect(() => {
    setTotalUsers(data);
    setFilteredUsers(data);
  }, [data]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(totalUsers);
    } else {
      const debouncedFilter = debounce(filterUsers, 700);
      debouncedFilter(searchQuery);
      return () => {
        debouncedFilter.cancel();
      };
    }
  }, [searchQuery, totalUsers]);

  const filterUsers = (query) => {
    const filteredData = totalUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination
  const itemsPerPage = 8;
  const totalPages = filteredUsers ? Math.ceil(filteredUsers.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers && filteredUsers.slice(startIndex, endIndex);

  return (
    <div className='container mt-2 h-[120vh] px-4'>
      <h1 className='h1 text-center dark:text-[#303030] text-[#e0e0e0]'>View User's</h1>
      <div className="row mt-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className='row mt-3'>
        {currentUsers && currentUsers.length > 0 ? (
          <table className='table table-hover border-[1px] border-[#bbbbbb]'>
            <thead>
              <tr>
                <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>No.</th>
                <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Username</th>
                <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Email</th>
                <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Phone</th>
                <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Total Books</th>
                <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Book Details</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{index + 1}</td>
                  <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{user.username}</td>
                  <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{user.email}</td>
                  <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{user.phone}</td>
                  <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{user.totalAcceptedBooks}</td>
                  <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>
                    <Link to={`/admin/viewusers/${user._id}`}>
                      <button className='btn mx-1 edit-books-btn border-none bg-[#6a5af9] dark:bg-[#4cceac] dark:text-[#303030] text-[#e0e0e0]'>
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-center my-1' style={{ fontSize: '2rem' }}>
            0 Registered Users
          </p>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <ul className="pagination justify-content-center mt-3">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, page) => (
              <li key={page} className={`page-item ${page + 1 === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(page + 1)}>{page + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
