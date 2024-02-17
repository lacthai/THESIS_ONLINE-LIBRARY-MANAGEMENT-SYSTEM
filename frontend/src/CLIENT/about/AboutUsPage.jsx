import React from "react";
import { Container } from "react-bootstrap";
import { GiTechnoHeart, GiCursedStar, GiCartwheel } from "react-icons/gi";
import { RiDoubleQuotesL } from "react-icons/ri";
import {FiChevronDown} from "react-icons/fi";
import {BsDot} from "react-icons/bs";
import {TbArrowNarrowRight} from "react-icons/tb";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

const AboutUsPage = () => {
  const circleText = (text) => {};
  return (
    <div className="h-fit" >
      <div className="about-us_header">
        <div className="about-us_header-icon">
          <img src="/flower_header_1.png" alt="icon1" />
        </div>
        <div className="about-us_header-title">
          <p className="dark:text-[#303030] text-[#e0e0e0]">
          Within the lines itself <span>you may find yourself</span>
          </p>
        </div>
        <div className="about-us_header-icon">
          <img src="flower_header_2.png" alt="icon2" />
        </div>
      </div>
      <div className="about-us_body">
        <div className="about-us_title1">
          <p className=" capitalize ml-6 dark:text-[#303030] text-[#e0e0e0]">website information</p>
          <ul className="list-disc dark:text-[#303030] text-[#e0e0e0]">
          <li>
            Contact Email:
            <span className="ml-1 underline text-[#6a5af9] dark:text-[#4cceac]">
              lacthai08@gmail.com
            </span>
          </li>
          <li>
            Phone number:
            <span className="ml-1 underline text-[#6a5af9] dark:text-[#4cceac]">
              0927043450
            </span>
          </li>
          <li>
            Media:
            <Link to="https://www.facebook.com/Lac.shiawase/">
              <FacebookIcon />
            </Link>
            <Link
              to="https://www.instagram.com/gii.laa_/"
              className="text-[#FF00BF]"
            >
              <InstagramIcon />
            </Link>
            <Link to="https://github.com/lacthai" className="text-[#303030]">
              <GitHubIcon />
            </Link>
          </li>
          <li>
            Online library system management website designed by:{" "}
            <Link to="https://github.com/lacthai">@Lacthai</Link>
          </li>
        </ul>
        </div>
        <img src="/book.jpg" alt="" className="banner1" />
        <img src="/book.jpg" alt="" className="banner2" />
        <img src="/book.jpg" alt="" className="banner3" />
        <img src="/book.jpg" alt="" className="banner4" />
        <img src="/book.jpg" alt="" className="banner5" />
        <img src="/book.jpg" alt="" className="banner6" />
        <img src="/book.jpg" alt="" className="banner7" />
        <div className="about-us_icon1">
          <GiTechnoHeart style={{ fontSize: "2.5rem", color: "#FF69B4" }} />
        </div>
        {/* <div className="about-us_icon2">
          <GiCursedStar style={{ fontSize: "3rem", color: "	#FFFF00" }} />
        </div> */}
        {/* <div className="about-us_icon3">
          <RiDoubleQuotesL style={{ fontSize: "3rem" }} />
        </div> */}
        <div className="about-us_title2">
          <img src="/about_us_gif.gif" alt="" className="mr-2 rounded-2xl"/>
        </div>

        <div className="about-us_title3">
          <p className="dark:text-[#303030] text-[#e0e0e0] italic">
          "This website was built to encourage students to borrow and create reading habits for personal development. "
          </p>
        </div>
        <div className="about-us_button1">
          <Link to="/books" className="button_explore no-underline flex px-2 py-3 rounded-3xl bg-[#e0e0e0] text-[#303030] font-semibold duration-[0.4s]">EXPLORE MORE <FiChevronDown style={{marginLeft: "3px", marginTop: "2px", fontSize: "1.3rem"}}/></Link>
        </div>
        <div className="about-us_detail1">
          <div className="about-us_clippath">
          </div>
          <div className="about-us-des">
            <div className="about-us_number dark:text-[#303030] text-[#e0e0e0]"><GiCartwheel style={{fontSize: "3.5rem"}}/></div>
            <div className="about-us_title4">
              <div className="about-us_time dark:text-[#303030] text-[#e0e0e0]">May 2023 <BsDot style={{fontSize: "1.3rem"}}/> @LacThai</div>
              <div className="about-us_des2 capitalize dark:text-[#303030] text-[#e0e0e0]">Online library management system</div>
            </div>
          </div>
          <div className="about-us_buuton2 dark:text-[#303030] text-[#e0e0e0]"><TbArrowNarrowRight className="text-[2rem]"/></div>
        </div>  
      </div>
    </div>
  );
};

export default AboutUsPage;
