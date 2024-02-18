import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backend_server } from "../../main";
import useFetch from "../../useFetch";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";

const UserIndividualPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const getSingleUser_API_URL = `${backend_server}/api/v1/users/${id}`;
  const UpdateClientEmail_API_URL = `${backend_server}/api/v1/updateUserEmail`;

  const [userBookData, setUserBookData] = useState([]);
  const [userData, setUserData] = useState();

  const fetched_data = useFetch(getSingleUser_API_URL);
  const bookData = fetched_data.fetched_data.bookData;
  const usersData = fetched_data.fetched_data.userData;

  // console.log(fetched_data.fetched_data)

  useEffect(() => {
    // Handles Array Length error without throwing error
    if (bookData) {
      setUserBookData(bookData);
    }
    if (usersData) {
      setUserData(usersData);
    }
  }, [bookData, usersData]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };
  const handleEditModalOpen = () => {
    setShowEditModal(true);
  };

  const HandleEmailUpdate = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const isValid = emailRegex.test(newEmail);
    if (!isValid) {
      return toast("Invalid Email Format", {
        icon: "ℹ️",
      });
    }

    try {
      const response = await axios.post(UpdateClientEmail_API_URL, {
        userId: id,
        newEmail,
      });

      if (response.data.ENTER_OTP == true) {
        navigate("/admin/otp", { replace: true });
        toast(response.data.message, {
          icon: "ℹ️",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const lastSpaceIndex = userData.username.lastIndexOf(" ");
  // const lastWord =
  //   lastSpaceIndex !== -1
  //     ? userData.username.slice(lastSpaceIndex + 1)
  //     : userData.username;
  // const firstLetter = lastWord.charAt(0).toUpperCase();

  return (
    <div className="container mt-2 h-[120vh]">
      {/* users details */}
      {userData && userData.username ? (
        <div className="row text-left my-2">
          <Row className="align-items-center ">
            {/* Image Section */}
            <Col md={4} className="text-center mx-1 my-2">
              <div className="profile-details border p-4 shadow flex flex-col items-center">
                <div className="p-3 rounded-full text-[#ffffff] dark:text-[#5c5470] bg-[#BC8F8F] dark:bg-[#FFDEAD] h-[120px] w-[120px] flex justify-center items-center text-[4rem]">
                  {userData.username.charAt(0).toUpperCase()}
                  {/* {firstLetter} */}
                </div>
                <p className="mt-3 dark:text-[#303030] text-[#e0e0e0]">
                  {userData.username.toUpperCase()}
                </p>
                {userData.emailVerified == true ? (
                  <h5 className="dark:text-[#303030] text-[#e0e0e0] flex justify-center items-center">
                    Status : Verified{" "}
                    <MdVerified className="ml-2 text-[#6a5af9] dark:text-[#4cceac]" />{" "}
                  </h5>
                ) : (
                  <h5 className="dark:text-[#303030] text-[#e0e0e0] flex justify-center items-center">
                    Status : UnVerified <GoUnverified  className="ml-2 text-[#fd5c63] dark:text-[#FF033E]" />{" "}
                  </h5>
                )}
              </div>
            </Col>

            {/* Other user INFO */}
            <Col md={6}>
              <div className="profile-details border p-4 shadow mx-1 my-2">
                <div className="d-flex" style={{ alignItems: "center" }}>
                  <h5 className="dark:text-[#303030] text-[#e0e0e0]">
                    Email: {userData.email}
                  </h5>
                  <button
                    className="btn btn-dark mx-2 dark:text-[#303030] text-[#e0e0e0] border-none bg-[#6a5af9] dark:bg-[#4cceac] flex justify-center items-center"
                    onClick={handleEditModalOpen}
                  >
                    Update <AiOutlineMail className="text-[1.1rem] ml-2" />{" "}
                  </button>
                </div>
                <hr />

                <h5 className="dark:text-[#303030] text-[#e0e0e0]">
                  Phone: {userData.phone}
                </h5>
                <hr />
                <h5 className="dark:text-[#303030] text-[#e0e0e0]">
                  Total Books: {userData.totalAcceptedBooks}
                </h5>
              </div>
            </Col>
          </Row>

          <Modal show={showEditModal} onHide={handleEditModalClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form onSubmit={(e) => HandleEmailUpdate(e)}>
                <Form.Group controlId="username">
                  <Form.Label>Current Email</Form.Label>
                  <Form.Control disabled type="text" value={userData.email} />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>New Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    autoComplete="off"
                    placeholder="Enter email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="text-center my-2">
                  <button type="submit" className="btn btn-success">
                    Update
                  </button>
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditModalClose}>
                Go Back
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <p className="p text-center mt-4">Loading ...</p>
      )}

      {/* User Books data table */}
      {userBookData.length > 0 ? (
        <div className="row">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" className=" bg-[#e0e0e0] dark:bg-[#ffffff]">
                  No.
                </th>
                <th scope="col" className=" bg-[#e0e0e0] dark:bg-[#ffffff]">
                  Book Title
                </th>
                <th scope="col" className=" bg-[#e0e0e0] dark:bg-[#ffffff]">
                  Issue Status
                </th>
                <th scope="col" className=" bg-[#e0e0e0] dark:bg-[#ffffff]">
                  Issue Date
                </th>
                <th scope="col" className=" bg-[#e0e0e0] dark:bg-[#ffffff]">
                  {" "}
                  Return Due
                </th>
                <th scope="col" className=" bg-[#e0e0e0] dark:bg-[#ffffff]">
                  {" "}
                  Returned Status
                </th>
              </tr>
            </thead>
            <tbody>
              {userBookData &&
                userBookData.map((users, index) => {
                  const {
                    bookTitle,
                    _id,
                    issueStatus,
                    isReturned,
                    issueDate,
                    returnDate,
                  } = users;

                  const bookissuedate = new Date(issueDate).toDateString();

                  const returnOrNot = isReturned === true ? "True" : "False";

                  const updateReturnDate =
                    returnDate === null
                      ? "NULL"
                      : new Date(returnDate).toDateString();
                  return (
                    <tr key={_id}>
                      <th
                        scope="row"
                        className=" bg-[#e0e0e0] dark:bg-[#ffffff]"
                      >
                        {index + 1}
                      </th>
                      <td className=" bg-[#e0e0e0] dark:bg-[#ffffff]">
                        {bookTitle}
                      </td>
                      <td className=" bg-[#e0e0e0] dark:bg-[#ffffff]">
                        {issueStatus}
                      </td>
                      <td className=" bg-[#e0e0e0] dark:bg-[#ffffff]">
                        {bookissuedate}
                      </td>
                      <td className=" bg-[#e0e0e0] dark:bg-[#ffffff]">
                        {updateReturnDate}
                      </td>
                      <td className=" bg-[#e0e0e0] dark:bg-[#ffffff]">
                        {returnOrNot}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p text-center mt-4 dark:text-[#303030] text-[#e0e0e0]">
          0 Book Data
        </p>
      )}
    </div>
  );
};

export default UserIndividualPage;
