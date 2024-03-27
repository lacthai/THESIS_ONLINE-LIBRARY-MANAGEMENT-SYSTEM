import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './card.css'
import RequestBook from '../requestBooks/RequestBook'
import { backend_server } from '../../main'
import axios from 'axios'
import Loading from '../../Components/Loading/Loading'

const PopularBooks = () => {
  const PopularBooks_API_URL = `${backend_server}/api/v1/popularBooks`
  // const { request_Book } = RequestBook()

  const [popularBooks, setPopularBooks] = useState([])
  const { request_Book } = RequestBook()

  const fetchData = async () => {
    try {
      const response = await axios.get(PopularBooks_API_URL)
      // console.log(response)
      setPopularBooks(response.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='grid grid-cols-4 gap-3'>
      {popularBooks.length > 0 ? (
        popularBooks.map((book) => {
          const { _id, title, image, author, available } = book
          const imgSrc = `${backend_server}/${image}`

          return (
            <div className='' key={_id}>
              <div className='card h-100'>
                <div className='card-img-top'>
                  <img
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    className='img-fluid'
                    src={imgSrc}
                    alt='book image'
                  />{' '}
                </div>

                <div className='card-body'>
                  <h5 className='h5 card-title'>{title}</h5>
                  <p className='p card-text'>{author}</p>
                  <div className='form-group mb-2 justify-content-center d-flex'>
                    {available ? (
                      <button
                        type='button'
                        className='btn btn-primary me-2 bg-[#6a5af9] dark:bg-[#4cceac] border-none'
                        onClick={() => request_Book(_id)}
                      >
                        Request
                      </button>
                    ) : (
                      <button
                        type='button'
                        className='btn btn-primary me-2 bg-[#fd5c63] dark:bg-[#E52B50] border-none'
                        disabled
                      >
                        Out of Stock
                      </button>
                    )}

                    <Link to={`/books/${_id}`}>
                      <button type='button' className='btn btn-secondary me-2'>
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default PopularBooks
