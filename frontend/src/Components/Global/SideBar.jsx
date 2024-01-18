import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import DashboardIcon from '@mui/icons-material/Dashboard';

const Item = ({ title, to, icon, selected, setSelected }) => {
  
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      className="dark:text-[#303030] text-[#F8F8F8] dark:hover:backdrop-blur-md dark:hover:bg-white/70 
      mr-[10%] rounded-xl hover:backdrop-blur-xl hover:bg-white/30"
    >
      <Typography className="text-[0.8rem]">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
                  {`${user.isAdmin ? "ADMIN" : "STUDENT"}`}
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
                  width="50px"
                  height="50px"
                  src={user.photoURL}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                  className="uppercase text-[2rem] dark:text-[#303030] text-[#e0e0e0]"
                >
                  {user.name}
                </Typography>
                <Typography className="text-[1rem] text-[#6a5af9] dark:text-[#4cceac]">
                  {user.email.substring(0, user.email.indexOf("@"))}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {!user.isAdmin && (

            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            )}
            {user.isAdmin && (
            <Item
              title="DashBoard"
              to="/"
              icon={<DashboardIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

            )}
            <Typography
              sx={{ m: "15px 0 5px 20px" }}
              className="text-[0.8rem] text-[#909090] dark:text-[#484848]"
            >
              Pages
            </Typography>
            {user.isAdmin && (
              <Item
                title="Manage Library"
                to="/manageBook"
                icon={<LibraryBooksIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {!user.isAdmin && (
              <Item
                title="Library"
                to="/category/all"
                icon={<MenuBookIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {user.isAdmin && (
              <Item
                title="Manage Documents"
                to="/document"
                icon={<PostAddIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {!user.isAdmin && (
              <Item
                title="Documents"
                to="/document"
                icon={<TopicIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Typography
              sx={{ m: "15px 0 5px 20px" }}
              className="text-[0.8rem] text-[#909090] dark:text-[#484848]"
            >
              Data
            </Typography>
            {user.isAdmin && (
              <Item
                title="Manage Order"
                to="/manageOrder"
                icon={<ShoppingCartCheckoutIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {user.isAdmin && (
              <Item
                title="Manage Students"
                to="/manageStudent"
                icon={<PersonSearchIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {!user.isAdmin && (
              <Item
                title="Cart"
                to="/cart"
                icon={<AddShoppingCartIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {user.isAdmin && (
              <Item
                title="Create Student"
                to="/signup"
                icon={<PersonAddIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {user.isAdmin && (
              <Item
                title="Create Books"
                to="/new-product"
                icon={<BookmarkAddIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            
            {!user.isAdmin && (
              <Item
                title="History"
                to="/orders"
                icon={<WorkHistoryIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Typography
              sx={{ m: "15px 0 5px 20px" }}
              className="text-[0.8rem] text-[#909090] dark:text-[#484848]"
            >
              Contacts
            </Typography>
            <Item
              title="About Us"
              to="/aboutus"
              icon={<InfoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Messenger"
              to="/chat"
              icon={<MessageIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
