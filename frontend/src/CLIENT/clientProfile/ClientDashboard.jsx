import React, { useEffect, useState } from "react";
import { backend_server } from "../../main";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import DoneIcon from '@mui/icons-material/Done';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ErrorIcon from '@mui/icons-material/Error';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SimCardAlertIcon from '@mui/icons-material/SimCardAlert';
import "./clientprofile.css";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const ClientDashboard = ({ userBookData }) => {
  const DELETE_BOOK_API = `${backend_server}/api/v1/requestBooks`;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userBookData.slice(indexOfFirstItem, indexOfLastItem);

  const handleRemoveBook = async (transactionId, issueStatus) => {
    try {
      const response = await axios.patch(DELETE_BOOK_API, {
        id: transactionId,
        issueStatus,
      });

      console.log(response);
      if (issueStatus === "DELETE") {
        toast.success("Cancel Success");
      } else {
        toast.success("Removed Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-3 h-[150vh] ">
      {/* User Books data table */}
      {userBookData.length > 0 ? (
        <div className="row my-4 ">
          <table className="table table-hover shadow-slate-50 rounded-xl border-t-[2px] border-x-[2px]">
            <thead>
              <tr className="">
                <th scope="col" className="">
                  No.
                </th>
                <th scope="col">Book Title</th>
                <th scope="col">Issue Status</th>
                <th scope="col">Issue Date</th>
                <th scope="col">Return Due</th>
                <th scope="col">Returned Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((users, index) => {
                const {
                  bookTitle,
                  _id,
                  issueStatus,
                  isReturned,
                  issueDate,
                  returnDate,
                } = users;

                let content;
                 
                  if (issueStatus === "PENDING") {
                    content = (
                      <div className="flex justify-center items-center border-[1px] border-[#FF7F50] rounded-2xl relative toast_pending">
                        <span className="flex justify-center items-center text-[#FF7F50]"><AutorenewIcon /> Pending</span>
                        <div className="show_toast_pending opacity-0 absolute h-[80px] w-[500px] bg-[#FF7F50] top-0 left-0 z-50 ease-out duration-[1s] rounded-2xl text-[#ffffff] flex justify-center items-center px-1">The system is waiting to be processed by the library manager, you can cancel the book loan request in this state</div>
                      </div>
                    );
                  } else if (issueStatus === "READY") {
                    content = (
                      <div className="flex justify-center items-center border-[1px] border-[#0039a6] rounded-2xl relative toast_pending">
                        <span className="flex justify-center items-center text-[#0039a6]"><ErrorIcon /> Ready</span>
                        <div className="show_toast_pending opacity-0 absolute h-[80px] w-[500px] bg-[#0039a6] top-0 left-0 z-50 ease-out duration-[1s] rounded-2xl text-[#ffffff] flex justify-center items-center p-4">Your books are available at the traditional library, come and pick up your books. In this state, you can still cancel the book borrowing process</div>
                      </div>
                    );
                  } else if (issueStatus === "RETURNED") {
                    content = (
                      <div className="flex justify-center items-center border-[1px] border-[#008B8B] rounded-2xl relative toast_pending">
                        <span className="flex justify-center items-center text-[#008B8B]"><BookmarkAddedIcon /> Returned</span>
                        <div className="show_toast_pending opacity-0 absolute h-[80px] w-[500px] bg-[#008B8B] top-0 left-0 z-50 ease-out duration-[1s] rounded-2xl text-[#ffffff] flex justify-center items-center p-4">You have returned the book to the library on time, in this state you can delete it from your borrowing history</div>
                      </div>
                    );
                  } else if (issueStatus === "CANCELLED") {
                    content = (
                      <div className="flex justify-center items-center border-[1px] border-[#C60C30] rounded-2xl relative toast_pending">
                        <span className="flex justify-center items-center text-[#C60C30]"><ReportProblemIcon /> Cancelled</span>
                        <div className="show_toast_pending opacity-0 absolute h-[80px] w-[500px] bg-[#C60C30] top-0 left-0 z-50 ease-out duration-[1s] rounded-2xl text-[#ffffff] flex justify-center items-center p-4">You have had your book canceled on the admin side, maybe because the book is out of stock or you have canceled your request</div>
                      </div>
                    );
                  } else {
                    content = (
                      <div className="flex justify-center items-center border-[1px] border-[#17B169] rounded-2xl relative toast_pending">
                        <span className="flex justify-center items-center text-[#17B169]"><DoneIcon /> Accepted</span>
                        <div className="show_toast_pending opacity-0 absolute h-[110px] w-[500px] bg-[#17B169] top-0 left-0 z-50 ease-out duration-[1s] rounded-2xl text-[#ffffff] flex justify-center items-center p-4">In this state, it means that you have successfully borrowed a book from the library. Pay attention to the due date to return the book on time. If the return deadline is exceeded, you will no longer be able to borrow the book.</div>
                      </div>
                    );
                  }
                  const bookissuedate = new Date(issueDate).toDateString();

                  const returnOrNot = isReturned === true ? <div className="bg-[#ACE1AF] w-fit p-2 rounded-full">
                    <span className="text-[#018749] font-semibold">True</span>
                  </div> : 
                  <div className="bg-[#fd5c63] w-fit p-2 rounded-full">
                      <span className="text-[#97233F] font-semibold">False</span>
                  </div>;

                  const updatedReturnDate =
                    returnDate === null
                      ? "NONE"
                      : new Date(returnDate).toDateString();
              
                  return (
                    <tr key={_id}>
                      <th scope="row">{index + 1}</th>
                      <td style={{ width: "250px" }}>{bookTitle}</td>
                      <td>{content}</td>
                      <td>{bookissuedate}</td>
                      <td>{updatedReturnDate}</td>
                      <td>{returnOrNot}</td>
                      {issueStatus === "PENDING" || issueStatus === "READY" ? (
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleRemoveBook(_id, "DELETE")}
                          >
                            Cancel
                          </button>
                        </td>
                      ) : (
                        ""
                      )}
                      {issueStatus === "RETURNED" ? (
                        <td>
                          <button
                            className="btn btn-dark"
                            onClick={() =>
                              handleRemoveBook(_id, "ALREADYRETURNED")
                            }
                          >
                            Remove
                          </button>
                        </td>
                      ) : (
                        ""
                      )}
                      {issueStatus === "CANCELLED" ? (
                        <td>
                          <button
                            className="btn btn-dark"
                            onClick={() =>
                              handleRemoveBook(_id, "ADMINCANCELLED")
                            }
                          >
                            Remove
                          </button>
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  );              
              })}
            </tbody>
          </table>
          
          {/* Pagination */}
          <nav className="flex justify-end">
            <ul className="pagination justify-content-center">
              {userBookData.length > itemsPerPage && (
                <React.Fragment>
                  <li className="page-item">
                    <button
                      className="rotate-180 border-[1px] border-[#484848] py-1 px-2 rounded-xl bg-[#ffffff]"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <PlayArrowIcon />
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      className="border-[1px] border-[#484848] py-1 px-2 rounded-xl bg-[#ffffff]"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={indexOfLastItem >= userBookData.length}
                    >
                      <PlayArrowIcon />
                    </button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </div>
      ) : (
        <p className="p text-center mt-4 dark:text-[#303030] text-[#e0e0e0] flex flex-col  justify-center items-center"><SimCardAlertIcon className="text-[3rem]"/>0 Book Data</p>
      )}
    </div>
  );
};

export default ClientDashboard;
