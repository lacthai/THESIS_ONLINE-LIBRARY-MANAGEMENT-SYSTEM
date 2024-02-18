import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import { Link } from "react-router-dom";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import { ThemeProvider } from "styled-components";
import { useLoginState } from "../../LoginState";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import { BiLogoGmail } from "react-icons/bi";
const Review = (props) => {
  const [state, setState] = useState({
    name: "",
    gender: "",
    phone: "",
    email: "",
    problem: "",
    idea: "",
  });

  useEffect(() => {
    const { steps } = props;
    const { name,email, gender, phone, problem ,idea } = steps;

    setState({ name,email, gender, phone , problem, idea});
  }, [props]);

  const { name,email, gender, phone , problem , idea} = state;

  return (
    <div className="w-full">
      <h3 className=" font-semibold">Summary</h3>
      <div className=" uppercase font-semibold">user information</div>
      <div className="flex flex-row">
        <span>Name:</span>
        <span className="ml-1">{name.value}</span>
      </div>
      <div className="flex flex-row">
        <span>Email:</span>
        <span className="ml-1">{email.value}</span>
      </div>
      <div className="flex flex-row">
        <span>Phone:</span>
        <span className="ml-1">{phone.value}</span>
      </div>
      <div className="flex flex-row">
        <span>Gender:</span>
        <span className="ml-1 capitalize">{gender.value}</span>
      </div>
      <div className="flex flex-col">
        <span className=" font-semibold uppercase">Problem encountered:</span>
        <span className=" capitalize">- {problem.value}</span>
        </div>
      <div className="flex flex-col">
        <span className=" font-semibold uppercase">Contribute ideas: </span>
        <span className=" capitalize">- {idea.value}</span>
        </div>
    </div>
  );
};

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const userLoginState = useLoginState();

  const View = () => {
    return (
      <Link
        to="/books"
        className=" no-underline text-[#6a5af9] dark:text-[#4cceac]"
      >
        Explore the book library
      </Link>
    );
  };

  const Document = () => {
    return (
      <Link
        to="/document"
        className=" no-underline text-[#6a5af9] dark:text-[#4cceac]"
      >
        Explore the documents library
      </Link>
    );
  };
  const AboutUs = () => {
    return (
      <div>
        <ul className="list-disc">
          <li>
            Contact Email:
            <span className="ml-1 underline text-[#6a5af9] dark:text-[#4cceac]">
              lacthai08@gmail.com
            </span>
          </li>
          <li>
            Phone number:
            <span className="ml-1 underline text-[#6a5af9] dark:text-[#4cceac]">
              0927043450
            </span>
          </li>
          <li>
            Media:
            <Link to="https://www.facebook.com/Lac.shiawase/">
              <FacebookIcon />
            </Link>
            <Link
              to="https://www.instagram.com/gii.laa_/"
              className="text-[#FF00BF]"
            >
              <InstagramIcon />
            </Link>
            <Link to="https://github.com/lacthai" className="text-[#303030]">
              <GitHubIcon />
            </Link>
          </li>
          <li>
            Online library system management website designed by:{" "}
            <Link to="https://github.com/lacthai">@Lacthai</Link>
          </li>
          <li>More Informations: <Link to="/about">Click Here</Link></li>
        </ul>
      </div>
    );
  };

  const ForgotPasswordIssue = () => {
    return (
      <div>
        <div className="">
          <span className="mb-1 font-semibold">Step 1:</span>
          <img
            src="./chatbot_forgotpassword_step1.png"
            alt="chatbot_forgotpassword"
          />
          <ul className="list-disc">
            <li>Enter correct email information and account phone number</li>
            <li>
              After sumbit, the system will display a form to change a new
              password
            </li>
          </ul>
        </div>
        <div>
          <span className="mb-1 font-semibold">Step 2:</span>
          <img
            src="./chatbot_forgotpassword_step2.png"
            alt="chatbot_forgotpassword"
          />
          <ul className="list-disc">
            <li>Log in with a new password and confirm again</li>
          </ul>
        </div>
      </div>
    );
  };

  const SignUpIssue = () => {
    return (
      <div className="">
        <div className="">
          <span className="mb-1 font-semibold">Step 1:</span>
          <img src="./chatbot_signup_step1.png" alt="chatbot_signup" />
          <div>- Enter all registered user information into the fields</div>
          <div className="flex">
            - Use personal{" "}
            <span className="flex justify-center items-center text-[#E32636]">
              {" "}
              gmail <BiLogoGmail className="ml-1" />
            </span>{" "}
            to register
          </div>
          <div>- Student name has a maximum length of 20 characters</div>
          <div>
            - Phone number is limited to 10 characters and must follow the form
            98...
          </div>
          <div>
            - Password must contain at least 5 characters and must contain at
            least 1 number, 1 lower case character and 1 special character
          </div>
        </div>
        <div>
          <span className="mb-1 font-semibold">Step 2:</span>
          <img src="./chatbot_signup_step2.png" alt="chatbot_signup" />
          <div>- Enter the "OTP code" sent to the gmail used to register</div>
          <div>
            - If you do not receive the "OTP code", you can request to resend
            the code
          </div>
          <div>
            {" "}
            The "OTP code" only lasts for 60 seconds and then you cannot use the
            old code
          </div>
        </div>
        <Link to="/signup">Click here to register an account</Link>
      </div>
    );
  };

  const BorrowBook = () => {
    return (
      <div className=" font-medium flex flex-col">
        <span>
          Step 1: <Link to="/login">Log in</Link> to your account to borrow
          books
        </span>
        <span>Step 2: Click the "Request" button below each book</span>
        <img
          src="./chatbot_borrowbook_step1.png"
          alt="chatbot_borowbook"
          className="flex justify-center items-center"
        />
        <span>
          Step 3: Borrowed books are in the{" "}
          <a className="text-[#FF7F50] no-underline">"pending"</a> status in the
          book borrowing history section
        </span>
        <span>
          Step 4: When the manager changes the status to <a className=" no-underline text-[#0039a6]">"Ready"</a>, it means your books can be picked up at the traditional library
        </span>
        <span>Step 5: When you have successfully retrieved the book, the status will change to <a href="" className=" no-underline text-[#17B169]">"Accepted"</a></span>
      </div>
    );
  };

  const RuleBorrow = () => {
    return (
      <div className="flex flex-col">
        <span className=" font-semibold uppercase text-center">
          library rules
        </span>
        <span>- Each student can borrow a maximum of 5 books</span>
        <span>
          - Students must remember to return books on time (10 days from the
          date of borrowing the book).
        </span>
        <span>- Store books carefully when borrowing them home</span>
        <span>
          - Contact the library manager immediately via email if there are
          problems with books
        </span>
      </div>
    );
  };
  const DocumentIssue = () => {
    return (
      <div className="flex flex-col">
        <span className=" font-semibold uppercase text-center">
          Documentation Issue
        </span>
        <span>- Students or guests can view documents</span>
        <span>- User must log in to download documents</span>
        <span>
          - This document function is only in demo status so there is not much
          data yet
        </span>
        <span>
          - Explore now: <Link to="/document">Click here</Link>
        </span>
      </div>
    );
  };
  const ProfileIssue = () => {
    return (
      <div className="flex flex-col">
        <span className=" font-semibold uppercase text-center">
        How to update profile
        </span>
        <span>
          Step 1: <Link to="/login">Log in</Link> to your account to update profile
        </span>
        <span>Step 2: Select the <a href="" className=" font-semibold no-underline text-[black]">settings icon</a> on the topbar - then select the <a href="" className=" font-semibold no-underline text-black">Profile</a> button</span>
        <span>
          Step 3: Select <a href="" className=" font-semibold no-underline text-[black]">"My Details"</a> then click on <a href="" className=" font-semibold no-underline text-black">"Edit"</a> in the student information fields you want to change (Students can update their name, phone number and password)
        </span>
        <span>
          Step 4: Click <a href="" className=" font-semibold no-underline text-black">"Submit"</a> to update information
        </span>
      </div>
    )
  };

  const ThankFeedBack = () => {
    return (
      <div className="flex flex-col">
        <span className=" mb-3">Thank you for using IU E-Library !</span>
        <span>If you have any feedback or ideas to share with IU E-Library Team, please leave a message below. We will try to create a better experience for you.</span>
        <span className=" mt-3">First, please tell me a little information about yourself !</span>
      </div>
    )
  }

  const theme = {
    background: "#f5f8fb",
    headerBgColor: "#42a5f5",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#42a5f5",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  return (
    <>
      <div
        onClick={handleToggleChat}
        className="h-[70px] hover:scale-[1.05] ease-in duration-300 cursor-pointer w-[70px] flex justify-center items-center fixed bottom-7 right-7 bg-[#ffffff] text-[#6a5af9] dark:text-[#4cceac] rounded-full z-50 shadow-lg shadow-slate-100 dark:shadow-stone-400"
      >
        <MarkUnreadChatAltIcon className="text-[2.3rem]" />
      </div>

      <ThemeProvider theme={theme}>
        <ChatBot
          className={`${
            isOpen ? "block" : "hidden"
          } fixed right-[2%] bottom-[16%] z-50 rounded-xl bg-black`}
          botAvatar="/logo_IU_circle.png"
          headerTitle="📖 IU library chatbot"
          customDelay="1000"
          userAvatar="/logo_admin.png"
          steps={[
            {
              id: "1",
              message: "Welcome to the IU online library system",
              trigger: "2",
            },
            {
              id: "2",
              message:
                "This is the automatic IU library chabot, how can I help you?",
              trigger: "question",
            },
            {
              id: "question",
              options: [
                { value: 1, label: "View Library", trigger: "viewlibrary" },
                { value: 2, label: "View Document", trigger: "viewdocument" },
                { value: 3, label: "About us", trigger: "viewdetail" },
                {
                  value: 4,
                  label: "consulting and problem solving",
                  trigger: "problem1",
                },
                {
                  value: 11,
                  label: "Feedback and ideas on E-Library",
                  trigger: "feedback",
                },
              ],
            },
            {
              id: "backquestion",
              options: [
                { value: 2, label: "View Document", trigger: "viewdocument" },
                { value: 3, label: "About us", trigger: "viewdetail" },
                {
                  value: 4,
                  label: "consulting and problem solving",
                  trigger: "problem1",
                },
                {
                  value: 11,
                  label: "Feedback and ideas on E-Library",
                  trigger: "feedback",
                },
              ],
            },
            {
              id: "question1",
              options: [
                { value: 1, label: "ViewLibrary", trigger: "viewlibrary" },
                { value: 3, label: "About us", trigger: "viewdetail" },
                {
                  value: 4,
                  label: "consulting and problem solving",
                  trigger: "problem1",
                },
                {
                  value: 11,
                  label: "Feedback and ideas on E-Library",
                  trigger: "feedback",
                },
              ],
            },
            {
              id: "question2",
              options: [
                { value: 1, label: "View Library", trigger: "viewlibrary" },
                { value: 2, label: "View Document", trigger: "viewdocument" },
                {
                  value: 4,
                  label: "consulting and problem solving",
                  trigger: "problem1",
                },
                {
                  value: 11,
                  label: "Feedback and ideas on E-Library",
                  trigger: "feedback",
                },
              ],
            },
            {
              id: "viewlibrary",
              component: <View />,
              trigger: "backquestion",
            },
            {
              id: "viewdocument",
              component: <Document />,
              trigger: "question1",
            },
            {
              id: "viewdetail",
              component: <AboutUs />,
              trigger: "question2",
            },
            {
              id: "problem1",
              options: [
                {
                  value: 5,
                  label: `${
                    userLoginState.userLogState
                      ? "Forgot password issue"
                      : "Sign up issue"
                  }`,
                  trigger: "6",
                },
                { value: 7, label: "How to borrow books", trigger: "8" },
                {
                  value: 8,
                  label: "website's book borrowing rules",
                  trigger: "rule-borrow",
                },
                {
                  value: 9,
                  label: "Documentation issue",
                  trigger: "document-issue",
                },
                {
                  value: 10,
                  label: "Update Profile issue",
                  trigger: "profile-issue",
                },
              ],
            },
            {
              id: "6",
              component: userLoginState.userLogState ? (
                <ForgotPasswordIssue />
              ) : (
                <SignUpIssue />
              ),
              trigger: "update-problem1",
            },
            {
              id: "rule-borrow",
              component: <RuleBorrow />,
              trigger: "update-problem1",
            },
            {
              id: "8",
              component: <BorrowBook />,
              trigger: "update-problem1",
            },
            {
              id: "document-issue",
              component: <DocumentIssue />,
              trigger: "update-problem1",
            },
            {
              id: "profile-issue",
              component: <ProfileIssue />,
              trigger: "update-problem1",
            },
            {
              id: "update-problem1",
              message: "Would you like to advise on further issues?",
              trigger: "update-problem",
            },
            {
              id: "update-problem",
              options: [
                {
                  value: "yes-problem",
                  label: "Yes",
                  trigger: "update-yes-problem",
                },
                { value: "no-problem", label: "No", trigger: "end-problem" },
              ],
            },
            {
              id: "update-yes-problem",
              options: [
                {
                  value: 5,
                  label: `${
                    userLoginState.userLogState
                      ? "Forgot password issue"
                      : "Sign up issue"
                  }`,
                  trigger: "6",
                },
                { value: 7, label: "How to borrow books", trigger: "8" },
                {
                  value: 8,
                  label: "website's book borrowing rules",
                  trigger: "rule-borrow",
                },
                {
                  value: 9,
                  label: "Documentation issue",
                  trigger: "document-issue",
                },
                {
                  value: 10,
                  label: "Update Profile issue",
                  trigger: "profile-issue",
                },
              ],
            },
            {
              id: "end-problem",
              message: "Would you like feedback or suggestions for us?",
              trigger: "ask-feedback",
            },
            {
              id: "ask-feedback",
              options: [
                {
                  value: "yes-feedback",
                  label: "Yes",
                  trigger: "update-yes-feedback",
                },
                { value: "no-feedback", label: "No", trigger: "end-feedback" },
              ],
            },
            {
              id: "update-yes-feedback",
              options: [
                {
                  value: 11,
                  label: "Feedback and ideas on E-Library",
                  trigger: "feedback",
                },
              ],
            },
            {
              id: "end-feedback",
              message:
                "Thanks! Hope you can borrow good books to develop yourself",
              end: true,
            },
            {
              id: "feedback",
              component: <ThankFeedBack />,
              trigger: "thank-feedback",
            },
            {
              id: "thank-feedback",
              message: "What is your name?",
              trigger: "name",
            },
            {
              id: "name",
              user: true,
              validator: (value) => {
                if (value.length > 20) {
                  return "Number of characters limited to 20";
                // } else if (value < 0) {
                //   return "value must be positive";
                // } else if (value.length < 6) {
                //   return "value must be greater than 6";
                // } else if (value.length > 11) {
                //   return `${value}? 11 character limit!!!`;
                }
                return true;
              },
              trigger: "email-input",
            },
            {
              id: "email-input",
              message: "Hi {previousValue} ! What is your email?",
              trigger: "email",
            },
            {
              id: "email",
              user: true,
              trigger: "email-result",
              validator: (value) => {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(value)) {
                  return true;
                } else {
                  return "Please enter a valid email address";
              }
              },
            },
            {
              id: "email-result",
              message: "Email recording system: {previousValue} ! What is your gender?",
              trigger: "gender",
            },
            {
              id: "gender",
              options: [
                { value: "male", label: "Male", trigger: "55" },
                { value: "female", label: "Female", trigger: "55" },
                { value: "other", label: "Other", trigger: "55" },
              ],
            },
            {
              id: "55",
              message: "What is your contact phone number?",
              trigger: "phone",
            },
            {
              id: "phone",
              user: true,
              trigger: "detail-problem",
              validator: (value) => {
                if (isNaN(value)) {
                  return "value must be a number";
                } else if (value < 0) {
                  return "value must be positive";
                } else if (value.length < 6) {
                  return "value must be greater than 6";
                } else if (value.length > 11) {
                  return `${value}? 11 character limit!!!`;
                }
                return true;
              },
            },
            {
              id: "detail-problem",
              message: "Details the problem you are having",
              trigger: "problem",
            },
            {
              id: "problem",
              user: true,
              trigger: "detail-idea",
            },
            {
              id: "detail-idea",
              message: "Would you like to contribute ideas to the e-library site?",
              trigger: "idea",
            },
            {
              id: "idea",
              user: true,
              trigger: "77",
            },
            {
              id: "77",
              message: "Great! Check out your summary",
              trigger: "review",
            },
            {
              id: "review",
              component: <Review />,
              asMessage: true,
              trigger: "update",
            },
            {
              id: "update",
              message: "Would you like to update some field?",
              trigger: "update-question",
            },
            {
              id: "update-question",
              options: [
                { value: "yes", label: "Yes", trigger: "update-yes" },
                { value: "no", label: "No", trigger: "end-message" },
              ],
            },
            {
              id: "update-yes",
              message: "What field would you like to update?",
              trigger: "update-fields",
            },
            {
              id: "update-fields",
              options: [
                { value: "name", label: "Name", trigger: "update-name" },
                { value: "gender", label: "Gender", trigger: "update-gender" },
                { value: "email", label: "Email", trigger: "update-email" },
                { value: "phone", label: "Phone Number", trigger: "update-phone" },
                { value: "problem", label: "Problem sovling", trigger: "update-problem111" },
                { value: "idea", label: "development ideas", trigger: "update-idea" },
              ],
            },
            {
              id: "update-name",
              update: "name",
              trigger: "77",
            },
            {
              id: "update-gender",
              update: "gender",
              trigger: "77",
            },
            {
              id: "update-phone",
              update: "phone",
              trigger: "77",
            },
            {
              id: "update-email",
              update: "email",
              trigger: "77",
            },
            {
              id: "update-problem111",
              update: "problem",
              trigger: "77",
            },
            {
              id: "update-idea",
              update: "idea",
              trigger: "77",
            },
            {
              id: "end-message",
              message: "Thanks! Your data was submitted successfully!",
              end: true,
            },
          ]}
        />
      </ThemeProvider>
    </>
  );
};

export default Chat;
