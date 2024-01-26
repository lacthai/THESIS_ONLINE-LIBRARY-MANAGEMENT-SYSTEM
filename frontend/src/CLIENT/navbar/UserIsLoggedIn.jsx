import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import navbarData from './navbardata'
import './navbar.css'
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Box, IconButton } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

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
    <div className={`${dropdown ? "block" : "hidden"} absolute h-[140px] w-[130px] backdrop-opacity-10 backdrop-invert bg-white/50 dark:bg-slate-400 right-3 translate-y-[40%] z-50 rounded-xl overflow-hidden flex flex-col`}>
      <Link to="/profile" style={{textDecoration: "none"}} className='flex justify-center items-center h-[50%]'>
        <div className="  text-[#303030] capitalize hover:bg-slate-300 p-3 rounded-lg">
        <PersonOutlinedIcon className=" text-[#303030] mr-2"/>
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
      <Link to="/logoutclient" className=' h-[50%] flex justify-center items-center no-underline text-[#6a5af9] dark:text-[#4cceac]'>
        <div className='hover:bg-slate-300 p-3 rounded-lg'>
        <PowerSettingsNewIcon/> Logout

        </div>
        </Link>
    </div>
   </>
  )
}

export default UserIsLoggedIn
