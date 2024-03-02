import React, { useEffect, useState } from 'react'
import ManageSearchBooks from './ManageSearchBooks'
import axios from 'axios'
import './managebooks.css'
import CustomPagination from '../../CLIENT/pagination/CustomPagination'

// API BASE URL
import { backend_server } from '../../main'
import { Link } from 'react-router-dom'

const ManageBooks = () => {
  const API_URL = `${backend_server}/api/v1/books`
  const API_SKIPFETCH = `${backend_server}/api/v1/book/`

  // If 0 results then display false , true = results found , false = 0 search results
  const [searchResult, setSearchResult] = useState(true)

  // if filterForm is active , disbale pagination else allow paginations
  const [filterActive, setFilterActive] = useState(false)

  const fetchData = async (pageNumber) => {
    try {
      const resp = await axios.get(`${API_SKIPFETCH}/?page=${pageNumber}`)
      const data = await resp.data.data
      setAllBooks(data)
    } catch (error) {
      console.log('Error fetching books collections', error)
    }
  }

  const [allBooks, setAllBooks] = useState([])
  const [categories, setCategories] = useState([])

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL)

      const bookCategories = [
        ...new Set(
          response.data.data.map((items) => {
            return items.category
          })
        ),
      ]

      // console.log(bookCategories)
      setCategories(bookCategories)

      // setAllBooks(response.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    fetchBooks() //Fetches all books
    fetchData() //fetches only 8 books
  }, [])

  return (
    <div className='container mt-2 h-[150vh]'>
      <h1 className='h1 text-center font-semibold dark:text-[#303030] text-[#e0e0e0]'>Manage Books </h1>

      <div className='row my-3 px-4'>
        {/* Filter gareko books lai set Gareko */}
        <ManageSearchBooks
          setAllBooks={setAllBooks}
          bookCategories={categories}
        />
      </div>

      {/* TABLE BOOK DATA */}
      {allBooks.length > 0 ? (
        <div className='row mt-3 px-4'>
          <table className='table table-hover border-[1px] border-[#bbbbbb]'>
            <thead>
              <tr>
                <th scope='col' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>No.</th>
                <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Title</th>
                <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Category</th>
                <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Featured</th>
                <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>Available</th>
                <th scope='col'className=' bg-[#e0e0e0] dark:bg-[#ffffff]'> Update</th>
              </tr>
            </thead>
            <tbody>
              {allBooks.map((book, index) => {
                const { _id, title, category, featured, available } = book

                // Convert boolean values to strings
                const featuredText = featured ? 'Yes' : 'No'
                const availableText = available ? 'Yes' : 'No'

                return (
                  <tr key={_id}>
                    <th scope='row' className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{index + 1}</th>
                    <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{title}</td>
                    <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{category}</td>
                    <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{featuredText}</td>
                    <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>{availableText}</td>
                    <td className=' bg-[#e0e0e0] dark:bg-[#ffffff]'>
                      <Link to={`/admin/managebooks/${_id}`}>
                        <button className='btn mx-1 edit-books-btn dark:text-[#303030] text-[#e0e0e0] border-none bg-[#6a5af9] dark:bg-[#4cceac]'>
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {/* Pagination */}
          <div className='my-3 d-flex justify-content-center'>
            <CustomPagination
              fetchData={fetchData}
              filterActive={filterActive}
            ></CustomPagination>
          </div>
        </div>
      ) : (
        <p className='p text-center'>0 Book result's</p>
      )}
    </div>
  )
}

export default ManageBooks
