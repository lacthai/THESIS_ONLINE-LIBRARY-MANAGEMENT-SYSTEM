import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import navbarData from './navbardata'
import './navbar.css'
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Box, IconButton } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const UserIsLoggedIn = () => {
  const [dropdown, setDropdown] = useState(false);
  const { navbarLinksIsAuthenticated } = navbarData
  const ref = useRef(null);
  const handleDropDown = () => {
    setDropdown(!dropdown)
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <>
    
    <IconButton onClick={handleDropDown}>
        <SettingsOutlinedIcon className="dark:text-[#383838] text-[#E0E0E0]"/>
    </IconButton>
    <div className={`${dropdown ? "block" : "hidden"} absolute h-[100px] w-[130px] backdrop-opacity-10 backdrop-invert bg-white/30 bottom-[-90px] right-3 z-50 rounded-xl overflow-hidden`}>
      <Link to="/profile" style={{textDecoration: "none"}}>
        <div className="flex justify-center items-center h-[60%] dark:text-[#383838] text-[#E0E0E0] capitalize">
        <PersonOutlinedIcon className="dark:text-[#383838] text-[#E0E0E0] mr-2"/>
        {navbarLinksIsAuthenticated.map((map_para, index) => {
        const { name, url } = map_para
        return (
          <>
          {name}
          </>
        )
      })}
      </div>
      </Link>
    </div>
   </>
  )
}

export default UserIsLoggedIn
