import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { backend_server } from '../../main'
import './viewBooks.css'
import useFetch from '../../useFetch'
import RequestBook from '../requestBooks/RequestBook'
import SimilarBooks from './SimilarBooks'
import ReactHtmlParser from 'react-html-parser';
import SellIcon from '@mui/icons-material/Sell';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ViewBook = () => {
  const { id } = useParams() //fetching book id from url params
  const API_URL = `${backend_server}/api/v1/books/${id}`

  const { request_Book } = RequestBook()
  const navigate = useNavigate()

  const getData = useFetch(API_URL)

  // Destructuring fetched data
  const data = getData.fetched_data.data
  const imageFullPath = getData.imagePath

  const [bookData, setBookData] = useState({})

  useEffect(() => {
    setBookData({ ...data, image: imageFullPath })
    window.scrollTo(0, 0)
  }, [data])

  return (
    <div className='container'>
      <h1 className='h1 text-center my-4 font-bold dark:text-[#303030] text-[#e0e0e0]'>Book Details</h1>

      <div className='row mt-1 mb-3 shadow'>
        <div className='col-lg-6 col-sm-12 mx-5 my-2  image-div'>
          <img
            src={bookData.image}
            alt=''
            style={{ height: '90%', width: '300px' }}
            className='img-fluid'
          />
        </div>

        <div className='col mx-5 my-5 '>
          <h2 className='dark:text-[#303030] text-[#e0e0e0]'>{bookData.title} </h2>
          <p className='dark:text-[#767676] text-[#c5c4c4]'>by '{bookData.author}' </p>
          <h5 className='h5 dark:text-[#303030] text-[#e0e0e0]'>Category : {bookData.category} </h5>
          <h5 className='dark:text-[#303030] text-[#e0e0e0]'>Language : {bookData.language} </h5>
          <h5 className='dark:text-[#303030] text-[#e0e0e0] flex items-center'>
            Available :
            {bookData.available ? (
              <span className='bg-[#6a5af9] dark:bg-[#4cceac] w-fit p-2 rounded-2xl ml-1 flex justify-center items-center'> In Stock <SellIcon className='ml-1'/> </span>
            ) : (
              <span className='bg-[#fd5c63] dark:bg-[#E52B50] w-fit p-2 rounded-2xl ml-1 flex justify-center items-center'> Out of Stock <ErrorOutlineIcon className='ml-1'/></span>
            )}{' '}
          </h5>

          <h5 className='h5 my-1 mt-3 dark:text-[#303030] text-[#e0e0e0]'>Sypnosis :</h5>
          <h6 className='h6  my-2 dark:text-[#303030] text-[#e0e0e0]'> {ReactHtmlParser(bookData.description)}</h6>

          {/* Request Books Button */}
          <div className='text-center'>
            {bookData.available ? (
              <button
                type='button'
                className='btn btn-primary me-2 mt-3 bg-[#6a5af9] dark:bg-[#4cceac] border-none'
                onClick={() => request_Book(bookData._id)}
              >
                Request
              </button>
            ) : (
              <button
                disabled
                type='button'
                className='btn btn-primary me-2 mt-3 bg-[#fd5c63] dark:bg-[#E52B50] border-none'
              >
                Out of Stock
              </button>
            )}

            <button
              type='button'
              className='btn btn-secondary me-2 mt-3'
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      <SimilarBooks />
    </div>
  )
}

export default ViewBook
