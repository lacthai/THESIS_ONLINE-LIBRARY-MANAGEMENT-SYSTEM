import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CustomPagination from '../pagination/CustomPagination'
import SmallBanner from '../bannerHome/SmallBanner'
import PopularBooks from './PopularBooks'
import { backend_server } from '../../main'
import BrowseCollectionBooks from './BrowseCollectionBooks'
import { Toaster } from 'react-hot-toast'
import FilterBooksForm from './FilterBooksForm'
import Slider from "react-slick";
import { dataBannerCategory } from './dataBannerCategory'
import "./book.css";

const Books = () => {
  const API_URL = `${backend_server}/api/v1/book/`

  const [bookData, setBookData] = useState([])

  // If 0 results then display false , true = results found , false = 0 search results
  const [searchResult, setSearchResult] = useState(true)

  // if filterForm is active , disbale pagination else allow paginations
  const [filterActive, setFilterActive] = useState(false)

  const fetchData = async (pageNumber) => {
    try {
      const resp = await axios.get(`${API_URL}/?page=${pageNumber}`)
      const data = resp.data.data
      // console.log(data)
      setBookData(data)
    } catch (error) {
      console.log('Error fetching books collections')
    }
  }


  var settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='container'>
      {/* Popular Books Heading */}
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-[2.3rem] bg-[#dbd8e3] w-fit p-2 rounded-xl text-[#f76b8a]'>
          Popular Books
        </h1>

        {/* Popular Books */}
        <PopularBooks></PopularBooks>
      </div>

     
      <Slider
            {...settings}
            className="all-page-container row-start-1 row-end-2 col-start-1 col-end-5"
          >
            {dataBannerCategory.map((item, index) => (
              <div key={index} className="w-full h-[450px] p-[20px]">
                <img
                  src={item.linkImg}
                  alt="image_banner"
                  className="w-full h-full rounded-3xl"
                />
              </div>
            ))}
          </Slider>

      <div className='col mt-5 '>
        {/* Browse Collections HEADING */}
        <h1 className='h1 dark:text-[#303030] text-[#e0e0e0] font-semibold' style={{ textAlign: 'center' }}>
          Browse Collections
        </h1>

        <div className='mt-1'>
          {/* FILTER BOOKS SECTION */}
          <FilterBooksForm
            setBookData={setBookData}
            setSearchResult={setSearchResult}
            setFilterActive={setFilterActive}
          ></FilterBooksForm>
        </div>

        {/* BROWSE COLLECTIONS BOOKS */}
        <BrowseCollectionBooks
          bookData={bookData}
          searchResult={searchResult}
        ></BrowseCollectionBooks>

        {/* Pagination */}
        <div className='my-3 d-flex justify-content-center'>
          <CustomPagination
            fetchData={fetchData}
            filterActive={filterActive}
          ></CustomPagination>
        </div>
      </div>
    </div>
  )
}

export default Books
