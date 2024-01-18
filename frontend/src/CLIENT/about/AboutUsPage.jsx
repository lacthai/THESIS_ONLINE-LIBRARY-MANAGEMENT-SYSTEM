import React from "react";
import { Container } from "react-bootstrap";
import { GiTechnoHeart, GiCursedStar, GiCartwheel } from "react-icons/gi";
import { RiDoubleQuotesL } from "react-icons/ri";
import {FiChevronDown} from "react-icons/fi";
import {BsDot} from "react-icons/bs";
import {TbArrowNarrowRight} from "react-icons/tb";
import "./AboutUs.css";

const AboutUsPage = () => {
  const circleText = (text) => {};
  return (
    <div className="h-fit" >
      <div className="about-us_header">
        <div className="about-us_header-icon">
          <img src="/flower_header_1.png" alt="icon1" />
        </div>
        <div className="about-us_header-title">
          <p>
          Within the lines itself <span>you may find yourself</span>
          </p>
        </div>
        <div className="about-us_header-icon">
          <img src="flower_header_2.png" alt="icon2" />
        </div>
      </div>
      <div className="about-us_body">
        <div className="about-us_title1">
          <p>Summer Collection</p>
          <h2>Leading the way and outstanding features</h2>
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
        <div className="about-us_icon2">
          <GiCursedStar style={{ fontSize: "3rem", color: "	#FFFF00" }} />
        </div>
        <div className="about-us_icon3">
          <RiDoubleQuotesL style={{ fontSize: "3rem" }} />
        </div>
        <div className="about-us_title2">
          <div className="text" onChange={circleText}>
            <p onChange={circleText}>explore more collection ----</p>
          </div>
        </div>

        <div className="about-us_title3">
          <p>
            The ability of science and technology to improve human life is known
            to us. Technology has made us ever more productive.
          </p>
        </div>
        <div className="about-us_button1">
          <button>scroll down <FiChevronDown style={{marginLeft: "3px", marginTop: "2px", fontSize: "1.3rem"}}/></button>
        </div>
        <div className="about-us_detail1">
          <div className="about-us_clippath">
          </div>
          <div className="about-us-des">
            <div className="about-us_number"><GiCartwheel style={{fontSize: "3.5rem"}}/></div>
            <div className="about-us_title4">
              <div className="about-us_time">13 November 2022 <BsDot style={{fontSize: "1.3rem"}}/> Shop</div>
              <div className="about-us_des2">Always embrace new technology</div>
            </div>
          </div>
          <div className="about-us_buuton2"><TbArrowNarrowRight/></div>
        </div>  
      </div>
    </div>
  );
};

export default AboutUsPage;
