import React, { useState, useEffect } from 'react'
import useFetch from '../../useFetch'
import { backend_server } from '../../main'
import { Link } from 'react-router-dom'

const ViewUsers = () => {
  const users_api = `${backend_server}/api/v1/users`
  const [totalUsers, setTotalUsers] = useState([])

  const fetched_data = useFetch(users_api)
  const data = fetched_data.fetched_data.data
  // console.log(fetched_data.fetched_data.data)
  useEffect(() => {
    setTotalUsers(data)
  }, [data])

  return (
    <div className='container mt-2 h-[120vh]'>
      <h1 className='h1 text-center dark:text-[#303030] text-[#e0e0e0]'>View User's</h1>

      <div className='row mt-3'>
        {totalUsers && totalUsers.length > 0 ? (
          <table className='table table-hover'>
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
              {totalUsers &&
                totalUsers.map((user, index) => {
                  const { _id, username, email, phone, totalAcceptedBooks } =
                    user

                  return (
                    <tr key={_id}>
                      <th scope='row' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{index + 1}</th>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{username}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{email}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{phone}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{totalAcceptedBooks}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>
                        <Link to={`/admin/viewusers/${_id}`}>
                          <button className='btn mx-1 edit-books-btn border-none bg-[#6a5af9] dark:bg-[#4cceac] dark:text-[#303030] text-[#e0e0e0]'>
                            View Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        ) : (
          <p className='text-center my-1' style={{ fontSize: '2rem' }}>
            0 Registered Users
          </p>
        )}
      </div>
    </div>
  )
}

export default ViewUsers
