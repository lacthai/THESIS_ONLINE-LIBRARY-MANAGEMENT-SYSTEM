import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { Link } from 'react-router-dom';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { ThemeProvider } from 'styled-components';
const Review = (props) => {

  const [state, setState] = useState({
    name: '',
    gender: '',
    age: '',
  });

  useEffect(() => {
    const { steps } = props;
    const { name, gender, age } = steps;

    setState({ name, gender, age });
  }, [props]);

  const { name, gender, age } = state;

  return (
    <div style={{ width: '100%' }}>
      <h3>Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{name.value}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{gender.value}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{age.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const View = () => {
    return (
        <Link to="/books" className=' no-underline'>Explore the book library</Link>
    )
}

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

  const theme = {
    background: '#f5f8fb',
    headerBgColor: '#42a5f5',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#42a5f5',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
    };

  return (
    <>
    <div  onClick={handleToggleChat} 
    className='h-[70px] hover:scale-[1.05] ease-in duration-300 cursor-pointer w-[70px] flex justify-center items-center fixed bottom-7 right-7 bg-[#ffffff] text-[#6a5af9] dark:text-[#4cceac] rounded-full z-50 shadow-lg shadow-slate-100 dark:shadow-stone-400'>
    <MarkUnreadChatAltIcon 
        className='text-[2.3rem]'
    />
    </div>
    
    <ThemeProvider theme={theme}>
    
        <ChatBot
        className={`${isOpen ? "block" : "hidden"} fixed right-[2%] bottom-[16%] z-50 rounded-xl bg-black`}
        botAvatar="/logo_IU_circle.png"
        headerTitle=" IU library chatbot"
        customDelay="1000"
        userAvatar="/logo_admin.png"
          steps={[
            {
              id: '1',
              message: 'Welcome to the IU online library system',
              trigger: '2',
            },
            {
              id: '2',
              message: 'This is the automatic IU library chabot, how can I help you?',
              trigger: 'question',
            },
            {
              id: 'question',
              options: [
                { label: 'ViewLibrary', trigger: 'view' },
                { label: 'consulting and problem solving', trigger: 'problem' },
              ],
            },
            {
              id: 'view',
              component: <View />,
            //   trigger: 'view-message',
            },
            // {
            //   id: 'view-message',
            //   message: 'Are you need consulting and problem solving ?',
            //   trigger: 'problem',
            // },
            {
              id: 'problem',
              options: [
                { value: 'male', label: 'Sign up issue', trigger: '5' },
                { value: 'female', label: '', trigger: '5' },
                { value: 'female', label: 'Female', trigger: '5' },
              ],
            },
            {
              id: '5',
              message: 'How old are you?',
              trigger: 'age',
            },
            {
              id: 'age',
              user: true,
              trigger: '7',
              validator: (value) => {
                if (isNaN(value)) {
                  return 'value must be a number';
                } else if (value < 0) {
                  return 'value must be positive';
                } else if (value > 120) {
                  return `${value}? Come on!`;
                }
    
                return true;
              },
            },
            {
              id: '7',
              message: 'Great! Check out your summary',
              trigger: 'review',
            },
            {
              id: 'review',
              component: <Review />,
              asMessage: true,
              trigger: 'update',
            },
            {
              id: 'update',
              message: 'Would you like to update some field?',
              trigger: 'update-question',
            },
            {
              id: 'update-question',
              options: [
                { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                { value: 'no', label: 'No', trigger: 'end-message' },
              ],
            },
            {
              id: 'update-yes',
              message: 'What field would you like to update?',
              trigger: 'update-fields',
            },
            {
              id: 'update-fields',
              options: [
                { value: 'name', label: 'Name', trigger: 'update-name' },
                { value: 'gender', label: 'Gender', trigger: 'update-gender' },
                { value: 'age', label: 'Age', trigger: 'update-age' },
              ],
            },
            {
              id: 'update-name',
              update: 'name',
              trigger: '7',
            },
            {
              id: 'update-gender',
              update: 'gender',
              trigger: '7',
            },
            {
              id: 'update-age',
              update: 'age',
              trigger: '7',
            },
            {
              id: 'end-message',
              message: 'Thanks! Your data was submitted successfully!',
              end: true,
            },
          ]}
        />
</ThemeProvider>
        </>
  );
};

export default Chat;
