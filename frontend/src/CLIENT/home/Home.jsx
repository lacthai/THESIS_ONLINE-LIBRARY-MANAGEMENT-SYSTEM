import React from 'react'
import './home.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerHome from '../bannerHome/BannerHome'
import FeaturedBooks from '../featuredBooks/FeaturedBooks'
import RecentlyAddedBooks from '../recentlyAddedBooks/RecentlyAddedBooks'
import { Row } from 'react-bootstrap'
import RecommendedBooks from '../recommendedBooks/RecommendedBooks'
import { dataBannerHome } from "./dataImageHome";
import LogoIU from "/logo_IU_circle.png";


const Home = () => {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    Speed: 2000,
    autoplaySpeed: 2000,
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

  return (
    <div className=''>
      <div className="grid grid-cols-3 grid-rows-2 w-full h-[500px]">
          <Slider
            {...settings}
            className="row-start-1 row-end-2 col-start-1 col-end-3"
          >
            {dataBannerHome.map((item) => (
              <div className="layout_banner">
                <div className="banner_desc">
                  <h1 style={{ color: `${item.color}` }}>{item.title}</h1>
                  <p className="dark:text-[#383838] text-[#F5F5F5]">
                    {item.description}
                  </p>
                </div>
                <div className="banner_img">
                  <img src={item.linkImg} alt="images banner" />
                </div>
              </div>
            ))}
          </Slider>
          <div className="row-start-1 row-end-2 col-start-3 col-end-4 w-full -h-full flex justify-center items-center flex-col">
            <h2 className="text-[1.6rem] mb-4 dark:text-[#383838] text-[#F5F5F5] mt-10">
              International University
            </h2>
            <img
              src={LogoIU}
              alt="Logo_IU"
              className="h-[120px] w-[120px] rounded-full border-solid border-4 border-white"
            />
            <p className="uppercase text-[1.7rem] text-center mt-7 font-semibold text-[#6a5af9] dark:text-[#4cceac]">
              new learning website
            </p>
          </div>
        </div>
        <RecommendedBooks></RecommendedBooks>
      <BannerHome></BannerHome>
      <div className='container'>
        <Row className='my-3'>
        </Row>
        <Row>
          <RecentlyAddedBooks></RecentlyAddedBooks>
        </Row>
        <Row>
          <FeaturedBooks></FeaturedBooks>
        </Row>
      </div>
    </div>
  )
}

export default Home
