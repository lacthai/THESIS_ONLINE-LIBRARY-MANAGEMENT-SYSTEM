import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { sidebarData } from './sidebarData'
import './sidebar.css'
import { Box, IconButton, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TopicIcon from "@mui/icons-material/Topic";
import InfoIcon from "@mui/icons-material/Info";
import MessageIcon from "@mui/icons-material/Message";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import "react-pro-sidebar/dist/css/styles.css";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import BarChartIcon from '@mui/icons-material/BarChart';

const Item = ({ title, to, icon, selected, setSelected }) => {
  
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      className="dark:text-[#303030] text-[#F8F8F8] dark:hover:backdrop-blur-md dark:hover:bg-white/70 
      mr-1 rounded-xl hover:backdrop-blur-xl hover:bg-white/30"
    >
      <Typography className="text-[0.9rem] dark:text-[#303030] text-[#F8F8F8]">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
    sx={{
        "& .pro-sidebar-inner": {
            background: "transparent !important",
          },
      "& .pro-icon-wrapper": {
        backgroundColor: "transparent !important",
      },
      "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
      },
      "& .pro-inner-item:hover": {
          color: "#868dfb !important",
      },
      "& .pro-menu-item.active": {
          color: "#6870fa !important",
      },
  }}
  >
    <ProSidebar collapsed={isCollapsed} className="dark:bg-[#E0E0E0] bg-[#1f2a40]">
      <Menu iconShape="square" className="dark:bg-[#E0E0E0] bg-[#1f2a40]">
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
          }}
          className="dark:text-[#303030] text-[#e0e0e0]"
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
              className="dark:text-[#303030] text-[#e0e0e0]"
            >
              <Typography className="text-[1rem] dark:text-[#303030] text-[#e0e0e0] uppercase">
                admin
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon className="dark:text-[#303030] text-[#e0e0e0]"/>
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="logo admin"
                width="100px"
                height="100px"
                src='/logo_admin.png'
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
                className="uppercase text-[2rem] dark:text-[#303030] text-[#e0e0e0]"
              >
                IU LIBRARY
              </Typography>
              <Typography className="text-[1rem] text-[#6a5af9] dark:text-[#4cceac]">
                Manager
              </Typography>
            </Box>
          </Box>
        )}

        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
        
        <Typography
            sx={{ m: "15px 0 5px 20px" }}
            className="text-[0.8rem] text-[#909090] dark:text-[#484848]"
          >
            Evaluation
          </Typography>
          <Item
            title="Home"
            to="/admin"
            icon={<HomeOutlinedIcon/>}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Chart"
            to="/admin/chart"
            icon={<BarChartIcon/>}
            selected={selected}
            setSelected={setSelected}
          />
        
         
          <Typography
            sx={{ m: "15px 0 5px 20px" }}
            className="text-[0.8rem] text-[#909090] dark:text-[#484848]"
          >
            Manage Library
          </Typography>
          
          
            <Item
              title="Manage Books"
              to="/admin/managebooks"
              icon={<MenuBookIcon />}
              selected={selected}
              setSelected={setSelected}
            />
         
        
            <Item
              title="Add new Book"
              to="/admin/addnewbook"
              icon={<BookmarkAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Books Request's"
              to="/admin/booksrequests"
              icon={<AutorenewIcon />}
              selected={selected}
              setSelected={setSelected}
            />
        
         
          <Typography
            sx={{ m: "15px 0 5px 20px" }}
            className="text-[0.8rem] text-[#909090] dark:text-[#484848]"
          >
            Manage Student
          </Typography>
          <Item
            title="View Users"
            to="/admin/viewusers"
            icon={<ContactMailIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Issued Books"
            to="/admin/issuedbooks"
            icon={<FolderSpecialIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Issue Book to User"
            to="/admin/issuebooktouser"
            icon={<LibraryBooksIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Return Due Books"
            to="/admin/returnedbooks"
            icon={<CollectionsBookmarkIcon />}
            selected={selected}
            setSelected={setSelected}
          />


<Typography
            sx={{ m: "15px 0 5px 20px" }}
            className="text-[0.8rem] text-[#909090] dark:text-[#484848]"
          >
             Admin Account
          </Typography>
          <Item
            title="Admin Sign Up"
            to="/admin/adminsignup"
            icon={<GroupAddIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </Menu>
    </ProSidebar>
    </Box>
  )
}

export default Sidebar
