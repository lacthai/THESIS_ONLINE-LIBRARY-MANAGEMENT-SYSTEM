import React from "react";
import { Link } from "react-router-dom";
import navbarData from "./navbardata";
import "./navbar.css";

const UserIsNotLoggedIn = () => {
  const { navbarLinksNotAuthenticated } = navbarData;
  return (
    <div id="nav-conditional-rendering">
      {navbarLinksNotAuthenticated.map((map_para, index) => {
        const { name, url } = map_para;
        return (
          <Link to={url} className="nav-link flex justify-center  h-full mx-2">
            <div
              className="flex items-center  justify-center dark:text-[#303030] text-[#e0e0e0]  bg-[#6870fa] dark:bg-[#4cceac] w-[80px] rounded-full border-[2px] border-[#e0e0e0] dark:border-[#303030] hover:scale-[1.05] transition-[0.3s] font-semibold"
              key={index}
            >
              {name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default UserIsNotLoggedIn;
