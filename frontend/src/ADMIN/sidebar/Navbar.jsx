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
import useDarkMode from '../../Components/useDarkMode/useDarkMode'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Navbar = () => {
  
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const ref = useRef(null);

  return (
    <>
    <Box className="flex justify-end bg-[#141b2d] dark:bg-[#f8fafb]  relative"  p={2} ref={ref}>
      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          {isDarkMode ? (
            <LightModeOutlinedIcon onClick={() => toggleDarkMode(isDarkMode)} className="text-[#383838]"/>
          ) : (
            <DarkModeOutlinedIcon onClick={() => toggleDarkMode(isDarkMode)} className="text-[#E0E0E0]"/>
          )}
        </IconButton>
        <IconButton>
          <Link to="/notifications">
          <NotificationsOutlinedIcon className="dark:text-[#383838] text-[#E0E0E0]"/>
          </Link>
        </IconButton>
        <IconButton>
          <Link to="/admin/logout">
          <PowerSettingsNewIcon className="dark:text-[#383838] text-[#E0E0E0]"/>
          </Link>
        </IconButton>
        
          
      </Box>
    </Box>
    </>
  )
}

export default Navbar
