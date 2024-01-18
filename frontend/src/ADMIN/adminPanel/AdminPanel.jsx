import React, { useState, useEffect } from "react";
import { backend_server } from "../../main";
// import './adminpanel.css'
import axios from "axios";

import { GiBookshelf } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { GiBookPile } from "react-icons/gi";
import { FiGitPullRequest } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { Link } from "react-router-dom";



const AdminPanel = () => {
  const FetchInfo_API = `${backend_server}/api/v1/adminHomePageInfo`;

  const [homepageData, setHomepageData] = useState({});
  

  const fetchData = async () => {
    try {
      const response = await axios.get(FetchInfo_API);
      setHomepageData(response.data.data);
      // console.log(response.data.data)
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 


  return (
    <div className="w-full h-[600px] dark:bg-slate-200 bg-slate-500 rounded-lg grid grid-cols-3 grid-rows-2 px-6 gap-5">
      <Link to="/admin/managebooks" className="detail_admin-home mt-3 col-start-1 col-end-2 row-start-1 row-end-2 dark:bg-[#ffffff] bg-slate-300 rounded-2xl hover:scale-[1.05] ease-in duration-300 flex flex-col items-center no-underline">
        <div className="h-[20%] w-[80%] mt-3 flex justify-between">
          <GiBookshelf className=" text-[2.9rem] mt-6 text-[#1e1b57]" />
        </div>
        <div className="h-[60%] w-[80%] mt-2 flex justify-between items-center">
          <p className="text-[2rem] text-[#1e1b57]">Total Books</p>
          <p className="text-[2.5rem] dark:bg-[#4cceac] bg-[#6a5af9] px-[20px] rounded-full text-[#ffffff]">
            {homepageData.totalBooks}
          </p>
        </div>
      </Link> 
      <Link to="/admin/issuedbooks" className=" no-underline detail_admin-home mt-3  col-start-2 col-end-3 row-start-1 row-end-2 dark:bg-[#ffffff] bg-slate-300 rounded-2xl hover:scale-[1.05] ease-in duration-300 flex flex-col items-center">
        <div className="h-[20%] w-[80%] mt-3 flex justify-between">
          <GiBookPile className=" text-[2.9rem] mt-6 text-[#1e1b57]" />
        </div>
        <div className="h-[60%] w-[80%] mt-2 flex justify-between items-center">
          <p className="text-[2rem] text-[#1e1b57]">Issued Books</p>
          <p className="text-[2.5rem] dark:bg-[#4cceac] bg-[#6a5af9] px-[20px] rounded-full text-[#ffffff]">
          {homepageData.totalIssuedBooks}
          </p>
        </div>
      </Link>
      <Link to="/admin/booksrequests" className=" no-underline detail_admin-home mt-3 h col-start-3 col-end-4 row-start-1 row-end-2 dark:bg-[#ffffff] bg-slate-300 rounded-2xl hover:scale-[1.05] ease-in duration-300 flex flex-col items-center">
        <div className="h-[20%] w-[80%] mt-3 flex justify-between">
          <FiGitPullRequest className=" text-[2.9rem] mt-6 text-[#1e1b57]" />
        </div>
        <div className="h-[60%] w-[80%] mt-2 flex justify-between items-center">
          <p className="text-[2rem] text-[#1e1b57]">Book Requests</p>
          <p className="text-[2.5rem] dark:bg-[#4cceac] bg-[#6a5af9] px-[20px] rounded-full text-[#ffffff]">
          {homepageData.totalBookRequests}
          </p>
        </div>
      </Link>
      <Link to="/admin/viewusers"  className=" no-underline detail_admin-home mb-3  col-start-1 col-end-2 row-start-2 row-end-3 dark:bg-[#ffffff] bg-slate-300 rounded-2xl hover:scale-[1.05] ease-in duration-300 flex flex-col items-center">
        <div className="h-[20%] w-[80%] mt-3 flex justify-between">
          <FaUserFriends className=" text-[2.9rem] mt-6 text-[#1e1b57]" />
        </div>
        <div className="h-[60%] w-[80%] mt-2 flex justify-between items-center">
          <p className="text-[2rem] text-[#1e1b57]">Registered Users</p>
          <p className="text-[2.5rem] dark:bg-[#4cceac] bg-[#6a5af9] px-[20px] rounded-full text-[#ffffff]">
          {homepageData.totalRegisteredUsers}
          </p>
        </div>
      </Link>
      <div className="detail_admin-home mb-3  col-start-2 col-end-3 row-start-2 row-end-3 dark:bg-[#ffffff] bg-slate-300 rounded-2xl hover:scale-[1.05] ease-in duration-300 flex flex-col items-center">
        <div className="h-[20%] w-[80%] mt-3 flex justify-between">
          <BsFillJournalBookmarkFill className=" text-[2.9rem] mt-6 text-[#1e1b57]" />
        </div>
        <div className="h-[60%] w-[80%] mt-2 flex justify-between items-center">
          <p className="text-[2rem] text-[#1e1b57]">Authors Listed</p>
          <p className="text-[2.5rem] dark:bg-[#4cceac] bg-[#6a5af9] px-[20px] rounded-full text-[#ffffff]">
          {homepageData.totalAuthors}
          </p>
        </div>
      </div>
      <div className="detail_admin-home mb-3  col-start-3 col-end-4 row-start-2 row-end-3 dark:bg-[#ffffff] bg-slate-300 rounded-2xl hover:scale-[1.05] ease-in duration-300 flex flex-col items-center">
        <div className="h-[20%] w-[80%] mt-3 flex justify-between">
          <BiCategoryAlt className=" text-[2.9rem] mt-6 text-[#1e1b57]" />
        </div>
        <div className="h-[60%] w-[80%] mt-2 flex justify-between items-center">
          <p className="text-[2rem] text-[#1e1b57]">Categories Listed</p>
          <p className="text-[2.5rem] dark:bg-[#4cceac] bg-[#6a5af9] px-[20px] rounded-full text-[#ffffff]">
          {homepageData.totalCategories}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
