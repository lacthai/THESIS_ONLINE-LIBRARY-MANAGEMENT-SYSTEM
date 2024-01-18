import React, { useEffect, useState } from 'react'
import AdminPanel from '../adminPanel/AdminPanel'
import Sidebar from '../sidebar/Sidebar'
import { Row, Col } from 'react-bootstrap'
import { FiClock } from "react-icons/fi";
const AdminHome = () => {

  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId); // Clean up the interval on component unmount
    };
  }, []);

  function getCurrentTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    let newGreeting;

    if (currentHour >= 0 && currentHour < 12) {
      newGreeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      newGreeting = "Good afternoon";
    } else {
      newGreeting = "Good evening";
    }

    setGreeting(newGreeting);
  }, []);

  return (
    <div className='container my-3 h-[120vh]'>
      <div className="h-[80px]">
          <div className="h-[80px] w-full flex justify-between items-center mb-2">
            <p className="ml-6 text-[2rem] font-semibold dark:text-[#1e1b57] text-[#e0e0e0]">
              {greeting}, <span className="dark:text-[#4cceac] text-[#6a5af9]">ADMIN</span> !
            </p>
            <p className="mr-6 text-[2rem] text-[#A9A9A9] flex justify-center items-center">
              <span className="mr-4 h-fit w-fit p-2 font-medium rounded-2xl flex justify-center items-center">
                <FiClock className="mr-1" />
                {currentTime}
              </span>
              {new Date().toDateString()}
            </p>
          </div>
        </div>  
      <AdminPanel />
    </div>
  )
}

export default AdminHome
