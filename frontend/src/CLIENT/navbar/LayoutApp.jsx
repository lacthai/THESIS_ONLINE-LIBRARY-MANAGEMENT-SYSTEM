import { CssBaseline } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";
import Chat from "../clientChat/Chat";


export const LayoutApp = ({ children }) => {

  const [isSidebar, setIsSidebar] = useState(true);
  

  return (
    <>
          <CssBaseline />
          <Chat />
          <div className="app">
            <Sidebar isSidebar={isSidebar}/>
            <main className="content bg-[#141b2d] dark:bg-[#f8fafb] overflow-hidden">
              <Navbar setIsSidebar={setIsSidebar} />
              {children}
            </main>
          </div>
      </>
  );
};