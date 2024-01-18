import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TopicIcon from "@mui/icons-material/Topic";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PostAddIcon from "@mui/icons-material/PostAdd";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import InfoIcon from "@mui/icons-material/Info";
import MessageIcon from "@mui/icons-material/Message";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { backend_server } from '../../main'
import useFetch from "../../useFetch";
import axios from "axios";
import { useLoginState } from '../../LoginState'
import UserIsLoggedInSidebar from "./UserIsLoggedInSidebar";
import UserIsNotLoggedInSidebar from "./UserIsNotLoggedInSidebar";



const Item = ({ title, to, icon, selected, setSelected }) => {
  
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      className="dark:text-[#303030] text-[#F8F8F8] dark:hover:backdrop-blur-md dark:hover:bg-white/70 
      mr-[10%] rounded-xl hover:backdrop-blur-xl hover:bg-white/30"
    >
      <Typography className="text-[0.8rem] dark:text-[#303030] text-[#F8F8F8]">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
    const { userId } = useParams()
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const userLoginState = useLoginState()
  
  // const getSingleUser_API_URL = `${backend_server}/api/v1/users/${userId}`
  // const [userData, setUserData] = useState()

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetch(getSingleUser_API_URL);
  //       const usersData = await response.json();
  //       setUserData(usersData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUser();
  // }, [userId]);
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
      <ProSidebar collapsed={isCollapsed} className="dark:bg-[#E0E0E0] bg-[#1f2a40] ">
        <Menu iconShape="square" className="dark:bg-[#E0E0E0] bg-[#1f2a40]  ">
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
                <Typography className="text-[1rem] dark:text-[#303030] text-[#e0e0e0]">
                  STUDENT
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
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src='/clientprofile.png'
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
                  student
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          

            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
          
           
            <Typography
              sx={{ m: "15px 0 5px 20px" }}
              className="text-[0.8rem] text-[#909090] dark:text-[#484848]"
            >
              Pages
            </Typography>
            
            
              <Item
                title="Library"
                to="/books"
                icon={<MenuBookIcon />}
                selected={selected}
                setSelected={setSelected}
              />
           
          
              <Item
                title="Documents"
                to="/document"
                icon={<TopicIcon />}
                selected={selected}
                setSelected={setSelected}
              />
          
           
            <Typography
              sx={{ m: "15px 0 5px 20px" }}
              className="text-[0.8rem] text-[#909090] dark:text-[#484848]"
            >
              Contacts
            </Typography>
            <Item
              title="About Us"
              to="/about"
              icon={<InfoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* {userLoginState.userLogState ? <UserIsLoggedInSidebar /> : <UserIsNotLoggedInSidebar />} */}
          </Box>
        </Menu>
      </ProSidebar>
          </Box>
  );
};

export default Sidebar;
