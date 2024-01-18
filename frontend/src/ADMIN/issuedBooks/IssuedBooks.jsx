import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { backend_server } from '../../main'
import { Link } from 'react-router-dom'

const IssuedBooks = () => {
  const NOT_RETURNED_API = `${backend_server}/api/v1/requestBooks/notreturnedbooks`

  const [notReturnedBooks, setNotReturnedBooks] = useState([])

  const [isAnyBooksIssued, setIsAnyBooksIssued] = useState(false)

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

  return (
    <div className='container mt-2 h-[120vh]'>
      <h1 className='h1 text-center dark:text-[#303030] text-[#e0e0e0]'>Issued Books</h1>

      {isAnyBooksIssued ? (
        notReturnedBooks.length > 0 ? (
          <div className='row mt-3'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]' >No.</th>
                  <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]' >Book</th>
                  {/* <th scope='col'>Username</th> */}
                  <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]' >Email</th>
                  <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]' >Issue Date</th>
                  <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]' >Return Due</th>
                  <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]' >Return Status</th>
                </tr>
              </thead>

              <tbody>
                {notReturnedBooks.map((book, index) => {
                  const {
                    _id,
                    userEmail,
                    bookTitle,
                    username,
                    isReturned,
                    returnDate,
                    extraCharge,
                    issueDate,
                  } = book

                  return (
                    <tr key={_id}>
                      <th scope='row' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{index + 1}</th>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{bookTitle}</td>
                      {/* <td>{username}</td> */}
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{userEmail}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{new Date(issueDate).toDateString()}</td>
                      <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{new Date(returnDate).toDateString()}</td>
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
