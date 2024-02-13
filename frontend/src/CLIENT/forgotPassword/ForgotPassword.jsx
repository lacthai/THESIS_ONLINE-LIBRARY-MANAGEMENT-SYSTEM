import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend_server } from "../../main";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import "./forgot.css";
import { Modal} from "react-bootstrap";


const ForgotPassword = () => {
  const ForgotPassword_API = `${backend_server}/api/v1/forgotpassword`;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailPhoneValid, setIsEmailPhoneValid] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showTerm, setShowTerm] = useState(false);

  const handleCloseTerm = () => setShowTerm(false);
  const handleShowTerm = () => setShowTerm(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validateEmailPhone = await axios.post(ForgotPassword_API, {
        email,
        phone,
      });

      toast.success(" Credentials validation Success");
      setIsEmailPhoneValid(true);
      setUserId(validateEmailPhone.data.userId);

      setEmail("");
      setPhone("");
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back one page
  };

  // Updating Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordFormSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // Validate alphanumeric password with a must Special character
      const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

      const isPasswordValid = alphanumericRegex.test(password);
      if (!isPasswordValid) {
        return toast(
          "Password must be alphanumeric and contain at least one special character",
          {
            icon: "ℹ️",
          }
        );
      }

      try {
        const response = await axios.patch(ForgotPassword_API, {
          userId,
          newPassword: password,
        });

        toast.success(response.data.message);

        setPassword("");
        setConfirmPassword("");
        setPasswordMatch(true);

        navigate("/login", { replace: true });
      } catch (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
      }
    } else {
      setPasswordMatch(false);
      setTimeout(() => {
        setPasswordMatch(true);
      }, 3000);
    }
  };

  return (
    <div className="bg_forgot-password flex justify-center items-center h-[120vh] w-full">
      <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
        <h1 className="text-xl text-center font-bold text-gray-900 md:text-2xl ">
          Recover Account
        </h1>
        <form className="space-y-6 mt-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              htmlFor="usernamefield"
            >
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              autoComplete="off"
              required
              maxLength="20"
              minLength="5"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="emailfield"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Phone:
            </label>

            <input
              type="text"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
              pattern="9\d{9}"
              minLength="10"
              maxLength="10"
              autoComplete="off"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required={true}
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  className="font-medium text-primary-600 text-blue-700 hover:underline dark:text-blue-500 cursor-pointer"
                  onClick={handleShowTerm}
                >
                  Terms and Conditions
                </a>
                <Modal show={showTerm} onHide={handleCloseTerm} className="flex justify-center items-center">
                <Modal.Header closeButton>
                  <Modal.Title>Terms and Conditions</Modal.Title>
                </Modal.Header>
                  <Modal.Body>
                    <div className="h-[80px] flex justify-center items-center mb-4">
                      <img src="./logo_IU_circle.png" alt="" className='h-[100%]'/>
                    </div>
                    <ul className='list-disc'>
                      <li>Enter correct email information and account phone number</li>
                      <li>After sumbit, the system will display a form to change a new password</li>
                      <li>Log in with a new password and confirm again</li>
                    </ul>
                  </Modal.Body>
                  <div className="h-[250px] flex justify-center items-center mb-4">
                      <img src="./Forgot password.gif" alt="" className='h-[100%] w-[300px]'/>
                    </div>
              </Modal>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Recover Password
          </button>
        </form>
        {isEmailPhoneValid ? (
          <form className="space-y-6 mt-5" onSubmit={handlePasswordFormSubmit}>
            <h1 className="text-xl text-center font-bold text-gray-900 md:text-2xl ">
              Update Password
            </h1>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 "
                htmlFor="usernamefield"
              >
                New Password:
              </label>
              <input
                type="password"
                placeholder="Enter your new password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={5}
                autoComplete="off"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="emailfield"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Confirm Password:
              </label>

              <input
                type="password"
                placeholder="confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={5}
                autoComplete="off"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            {!passwordMatch && (
              <div className="alert alert-danger" role="alert">
                Password doesn't match
              </div>
            )}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required={true}
                />
              </div>             
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        ) : (
          ""
        )}
        <button
          className="btn btn-secondary mt-3 w-full"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
