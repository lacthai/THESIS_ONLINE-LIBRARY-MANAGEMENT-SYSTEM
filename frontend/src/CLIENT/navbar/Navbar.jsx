import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Box, IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import { BiUserCircle, BiPowerOff } from "react-icons/bi";
import './navbar.css'

// Importing all Navbar data's i.e. title,logo,links,etc
import navbarData from './navbardata'

// Conditionally rendering links based on user's login info
import UserLogin from './UserIsLoggedIn'
import UserSignin from './UserIsNotLoggedIn'

// navbar search option
import NavbarSearch from './NavbarSearch'

import { useLoginState } from '../../LoginState'
import useDarkMode from '../../Components/useDarkMode/useDarkMode'

const Navbar = () => {
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef(null);



  const userLoginState = useLoginState()

  const { navbarLinks, navbarTitle, navbarImage } = navbarData

  const handleDropDown = () => {
    setDropdown(!dropdown)
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  return (
    <>
    <Box className="flex justify-between bg-[#141b2d] dark:bg-[#f8fafb]  relative"  p={2} ref={ref}>
    <Link to='/' className='a flex justify-center items-center'>
          <img
            src={navbarImage}
            alt='Logo'
            width={'50'}
            className='flex'
          />
          <h4 className='text-[1.2rem] dark:text-[#303030] text-[#F8F8F8]' id='navbar-title-text'>
            {navbarTitle}
          </h4>
        </Link>
      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          {isDarkMode ? (
            <LightModeOutlinedIcon onClick={() => toggleDarkMode(isDarkMode)} className="text-[#383838]"/>
          ) : (
            <DarkModeOutlinedIcon onClick={() => toggleDarkMode(isDarkMode)} className="text-[#E0E0E0]"/>
          )}
        </IconButton>
        {/* <IconButton>
          {userLoginState.userLogState ? <Link to="/notifications">
          <NotificationsOutlinedIcon className="dark:text-[#383838] text-[#E0E0E0]"/>
          </Link> : <></>}
        </IconButton> */}
        
          {userLoginState.userLogState ? <UserLogin /> : <UserSignin />}
        {/* <div className={`${dropdown ? "block" : "hidden"} absolute h-[100px] w-[130px] backdrop-opacity-10 backdrop-invert bg-white/30 bottom-[-90px] right-3 z-50 rounded-xl overflow-hidden`}>
          <Link to="/profile" style={{textDecoration: "none"}}><div className="flex justify-center items-center h-[60%] dark:text-[#383838] text-[#E0E0E0] capitalize">
            <PersonOutlinedIcon className="dark:text-[#383838] text-[#E0E0E0] mr-2"/>
          profile
          </div>
          </Link>
        </div> */}
      </Box>
    </Box>
    </>
  )
}

export default Navbar
