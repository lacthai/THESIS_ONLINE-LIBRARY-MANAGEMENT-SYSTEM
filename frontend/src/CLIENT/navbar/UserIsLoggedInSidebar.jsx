import React, { useEffect, useState } from 'react'
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import MessageIcon from "@mui/icons-material/Message";
import { Box, IconButton, Typography } from "@mui/material";
import { Link} from "react-router-dom";


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

const UserIsLoggedInSidebar = () => {
    const [selected, setSelected] = useState("Dashboard");
  
  return (
    <>
         <Item
              title="Messenger"
              to="/chat"
              icon={<MessageIcon />}
              selected={selected}
              setSelected={setSelected}
            />
   </>
  )
}

export default UserIsLoggedInSidebar
