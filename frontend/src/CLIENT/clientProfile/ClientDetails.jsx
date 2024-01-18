import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import { backend_server } from "../../main";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useLoginState } from "../../LoginState";

const ClientDetails = ({ userData }) => {
  const UpdateUser_API_URL = `${backend_server}/api/v1/users`;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State variable to track password visibility
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const navigate = useNavigate();
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditModalShow = () => {
    setShowEditModal(true);
  };

  const handlePasswordModalClose = () => {
    setShowChangePasswordModal(false);
  };

  const handlePasswordModalShow = () => {
    setShowChangePasswordModal(true);
  };

  const [inputFieldPassword, setInputFieldPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [inputFieldNormal, setInputFieldNormal] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const handleOnChangeNormal = (e) => {
    setInputFieldNormal({
      ...inputFieldNormal,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangePassword = (e) => {
    setInputFieldPassword({
      ...inputFieldPassword,
      [e.target.name]: e.target.value,
    });
  };

  // Updates user Details
  const showLoadingToast = () => {
    return toast.loading("Loading...", {
      position: "top-center",
      duration: Infinity, // The toast will not automatically close
    });
  };

  const userLoginState = useLoginState();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const { username, email, phone } = inputFieldNormal;

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const isValid = emailRegex.test(email);
    // console.log(isValid)
    if (!isValid) {
      toast.error("Invalid Email Format");
    }
    const loadingToastId = showLoadingToast();
    try {
      const response = await axios.patch(UpdateUser_API_URL, {
        username,
        email,
        phone,
      });

      toast.dismiss(loadingToastId);
      if (response.data.ENTER_OTP == true) {
        toast.success(response.data.message);

        // reset OR set user login state to NULL
        userLoginState.logout();

        navigate("/otp", { replace: true });
      } else {
        toast.success("Update Success");
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      console.log(error.response);
    }
  };

  // Updates password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const { confirm_password, new_password, old_password } = inputFieldPassword;

    if (new_password === confirm_password) {
      // Validate alphanumeric password with a must Special character
      const alphanumericRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

      const isPasswordValid = alphanumericRegex.test(new_password);
      if (!isPasswordValid) {
        return toast.error(
          "Password must be alphanumeric and contain at least one special character"
        );
      }

      try {
        const response = await axios.patch(UpdateUser_API_URL, {
          old_password,
          new_password,
        });

        toast.success("Password Changed Successfully");
      } catch (error) {
        console.log(error);
        console.log(error.response);
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Password Doesnt Match");
    }
  };

  useEffect(() => {
    setInputFieldNormal({ ...userData });
  }, []);

  const lastSpaceIndex = userData.username.lastIndexOf(' ');
  const lastWord = lastSpaceIndex !== -1 ? userData.username.slice(lastSpaceIndex + 1) : userData.username;
  const firstLetter = lastWord.charAt(0).toUpperCase();

  return (
    <div className="profile_layout">
      <div className="profile_update-img">
        <div className="img_profile">
          <div className="text-[#ffffff] dark:text-[#5c5470] bg-[#BC8F8F] dark:bg-[#FFDEAD] h-full flex justify-center items-center text-[4rem]">
            {userData.username.charAt(0).toUpperCase()}
            {firstLetter}
          </div>
        </div>
        <div className="header_name-proflie">
          <h2 className="uppercase">{userData.username}</h2>
          <p>ID Library: {userData._id}</p>
        </div>
      </div>
      <Container className="profile_box dark:bg-[#fff] bg-[#1f2a40]">
        <div className="profile_container">
          <div className="profile_update-info">
            <div className="profile_info-title text-[#fff] dark:text-[#404040]">
              Account Information
            </div>
            <div className="profile_info-input">
              <label className="text-[#fff] dark:text-[#404040]">Name</label>
              <p className=" capitalize text-[#fff] dark:text-[#404040]">
                {userData.username}
              </p>
              <button
                onClick={handleShow2}
                className="text-[#6a5af9] dark:text-[#4cceac] bg-inherit"
              >
                Edit
              </button>
              <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Your Name</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleUpdateProfile(e)}>
                  <Modal.Body>
                    <Form.Group as={Row} className="mb-3" controlId="username">
                      <Form.Label column sm="3">
                        New Name
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="text"
                          minLength={5}
                          placeholder="Enter username"
                          name="username"
                          onChange={handleOnChangeNormal}
                          value={inputFieldNormal.username}
                          required
                          autoComplete="off"
                        />
                      </Col>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                      Close
                    </Button>
                    <Button type="submit" onClick={handleClose2}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>
            <div className="profile_info-input">
              <label className="text-[#fff] dark:text-[#404040]">Phone</label>
              <p className="text-[#fff] dark:text-[#404040]">
                {userData.phone}
              </p>
              <button
                onClick={handleShow3}
                className="text-[#6a5af9] dark:text-[#4cceac] bg-inherit"
              >
                Edit
              </button>
              <Modal show={show3} onHide={handleClose3}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Your Phone Number</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleUpdateProfile(e)}>
                  <Modal.Body>
                    <Form.Group as={Row} className="mb-3" controlId="phone">
                      <Form.Label column sm="3">
                        New Phone
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="text"
                          required
                          placeholder="Enter phone number"
                          name="phone"
                          value={inputFieldNormal.phone}
                          onChange={handleOnChangeNormal}
                          pattern="9\d{9}"
                          minLength="10"
                          maxLength="10"
                        />
                      </Col>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose3}>
                      Close
                    </Button>
                    <Button type="submit" onClick={handleClose3}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>
            <div className="profile_info-input">
              <label className="text-[#fff] dark:text-[#404040]">Email</label>
              <p className="text-[#fff] dark:text-[#404040] underline">
                {userData.email}
              </p>
              <Modal show={show5} onHide={handleClose5}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Your Email</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleUpdateProfile(e)}>
                  <Modal.Body>
                    <Form.Group as={Row} className="mb-3" controlId="email">
                      <Form.Label column sm="3">
                        New Email
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="email"
                          required
                          autoComplete="off"
                          placeholder="Enter email"
                          name="email"
                          value={inputFieldNormal.email}
                          onChange={handleOnChangeNormal}
                          readOnly
                        />
                      </Col>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose5}>
                      Close
                    </Button>
                    <Button type="submit" onClick={handleClose5}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>
            <div className="profile_info-input">
              <label className="text-[#fff] dark:text-[#404040]">Total Book</label>
              <p className="text-[#fff] dark:text-[#404040] ">
                  {userData.totalAcceptedBooks}
              </p>
            </div>

            <div className="profile_info-input">
              <label className="text-[#fff] dark:text-[#404040]">
                Password
              </label>
              <p
                onClick={handleShow4}
                style={{ cursor: "pointer" }}
                className="text-[#6a5af9] dark:text-[#4cceac] underline"
              >
                Change Password
              </p>{" "}
              <Modal show={show4} onHide={handleClose4}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => handleUpdatePassword(e)}>
                  <Modal.Body>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="old password"
                    >
                      <Form.Label column sm="4">
                        Old Pasword
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          type="password"
                          minLength={5}
                          required
                          placeholder="Enter old password"
                          name="old_password"
                          onChange={handleOnChangePassword}
                          value={inputFieldPassword.old_password}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="new password"
                    >
                      <Form.Label column sm="4">
                        New Pasword
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          required
                          minLength={5}
                          type="password"
                          placeholder="Enter new password"
                          name="new_password"
                          onChange={handleOnChangePassword}
                          value={inputFieldPassword.new_password}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="confirm password"
                    >
                      <Form.Label column sm="4">
                        Confirm Pasword
                      </Form.Label>
                      <Col sm="8" className="relative">
                        <Form.Control
                          type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                          required
                          minLength={5}
                          placeholder="Re-enter new Password"
                          name="confirm_password"
                          onChange={handleOnChangePassword}
                          value={inputFieldPassword.confirm_password}
                        />
                        <span
                          onClick={() =>
                            setShowPassword(
                              (prevShowPassword) => !prevShowPassword
                            )
                          }
                          className=" cursor-pointer absolute right-[8%] translate-y-[60%] top-0"
                        >
                          {showPassword ? <BsEye /> : <BsEyeSlash />}
                        </span>
                      </Col>
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose4}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>
          </div>
        </div>
      </Container>
      <div className="profile_bg bg-[#141b2d] dark:bg-white"></div>
    </div>
  );
};

export default ClientDetails;
