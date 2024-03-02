import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { backend_server } from "../../main";
import { FaMedal } from "react-icons/fa";
import { IoIosMedal } from "react-icons/io";
import { RiMedalLine } from "react-icons/ri";
import { PiMedalFill } from "react-icons/pi";
import { Modal } from "react-bootstrap";
import { FaClipboardUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AdminMostUser = () => {
  const [mostBorrowedUsers, setMostBorrowedUsers] = useState(null);
  const [timeframe, setTimeframe] = useState("week");
  const [openModalIndex, setOpenModalIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, [timeframe]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${backend_server}/api/v1/mostBorrowedUsers?timeframe=${timeframe}`
      );
      setMostBorrowedUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMostBorrowedUsers(null);
    }
  };

  const handleChangeTimeframe = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const getUserCardColor = (index) => {
    const colors = [
      "bg-red-200",
      "bg-blue-200",
      "bg-green-200",
      "bg-yellow-200",
    ];
    return colors[index % colors.length];
  };

  const getUserCardLength = (index) => {
    const length = ["w-[100%]", "w-[80%]", "w-[65%]", "w-[55%]"];
    return length[index % length.length];
  };

  const getIconByRank = (index) => {
    const icons = [
      <FaMedal className="text-[2.6rem]" />,
      <IoIosMedal className="text-[2.3rem]" />,
      <RiMedalLine className="text-[2rem]" />,
      <PiMedalFill className="text-[1.6rem]" />,
    ];
    return icons[index % icons.length];
  };

  const handleShowTerm = (index) => {
    setOpenModalIndex(index);
  };

  const handleCloseTerm = () => {
    setOpenModalIndex(null);
  };

  return (
    <div className="w-full mt-3">
      <div className="w-full grid grid-cols-3 bg-[#4cceac] mt-2 py-1 px-1 font-semibold">
        <button
          onClick={() => handleChangeTimeframe("week")}
          className={`${
            timeframe === "week" ? "bg-[#ffffff]" : ""
          } rounded-lg ease-in duration-[0.4s]`}
        >
          Week
        </button>
        <button
          onClick={() => handleChangeTimeframe("month")}
          className={`${
            timeframe === "month" ? "bg-[#ffffff]" : ""
          } rounded-lg ease-in duration-[0.4s]`}
        >
          Month
        </button>
        <button
          onClick={() => handleChangeTimeframe("year")}
          className={`${
            timeframe === "year" ? "bg-[#ffffff]" : ""
          } rounded-lg ease-in duration-[0.4s]`}
        >
          Year
        </button>
      </div>
      {mostBorrowedUsers ? (
        <div className="w-full mt-4">
          {mostBorrowedUsers.userId.map((userId, index) => (
            <div className="w-full flex flex-row items-center mt-2 ml-1">
              <div
                className="w-[91%] hover:opacity-[0.8] cursor-pointer"
                onClick={() => handleShowTerm(index)}
              >
                <div
                  key={index}
                  className={`p-4 rounded ${getUserCardColor(
                    index
                  )} ${getUserCardLength(index)}`}
                >
                  <span className="text-[1.5rem] font-semibold text-[#303030] mr-2 bg-[#ffffff] px-3 py-2 rounded-full">
                    {index + 1}
                  </span>
                  <span className=" font-semibold text-[1.4rem]">
                    {mostBorrowedUsers.usernames[index]}
                  </span>
                </div>
              </div>
              <div className="w-[9%] flex justify-center items-center">
                {getIconByRank(index)}
              </div>
              <Modal
                show={openModalIndex === index}
                onHide={handleCloseTerm}
                backdrop="static"
                keyboard={false}
                className="flex justify-center items-center"
              >
                <Modal.Header closeButton>
                  <Modal.Title className="flex justify-center items-center">User Details <FaClipboardUser className="ml-2"/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="w-full flex justify-center items-center mb-3">
                    <span className={`rounded-full ${getUserCardColor(index)} p-3 text-[#383838]`}>
                        {getIconByRank(index)}
                    </span>
              </div>
                  <p className="bg-[#C8C8C8] px-3 py-1 rounded-xl flex justify-between">User ID: 
                  <span className=" font-semibold">
                  {userId}
                  </span>
                  </p>
                  <p className="bg-[#C8C8C8] px-3 py-1 rounded-xl flex justify-between">Username:
                  <span className=" font-semibold">
                  {mostBorrowedUsers.usernames[index]}
                  </span>
                  </p>
                  <p className="bg-[#C8C8C8] px-3 py-1 rounded-xl flex justify-between">Email:
                  <span className=" font-semibold">
                  {mostBorrowedUsers.userEmails[index]}
                  </span>
                  </p>
                  <p className="bg-[#C8C8C8] px-3 py-1 rounded-xl flex justify-between">Total Borrowings: 
                  <span className=" font-semibold">
                  {mostBorrowedUsers.userTotal[index]}
                  </span>
                  </p>
                  <div className="flex justify-center items-center">
                    <Link to={`/admin/viewusers/${userId}`} className="bg-[#F8F8F8] shadow-xl shadow-gray-400 px-3 py-1 no-underline text-[#383838] rounded-xl hover:scale-[1.05] duration-[0.4s] ease-in-out border-[1px] border-[#989898] font-bold">More Details</Link>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AdminMostUser;
