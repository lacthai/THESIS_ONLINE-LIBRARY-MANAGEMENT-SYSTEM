import React, { useEffect, useRef, useState } from 'react'
import './login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { backend_server } from '../../main'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { GiSecretBook } from "react-icons/gi";
import { useLoginState } from '../../LoginState'
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import LogoIU from "/logo_IU_circle.png"

const Login = () => {
  const API_URL = `${backend_server}/api/v1/login`

  const navigate = useNavigate()
  const refUsername = useRef(null)

  const Empty_Field_Object = { email: '', password: '' }
  const [textfield, setTextField] = useState(Empty_Field_Object)
  const [showPassword, setShowPassword] = useState(false) // State variable to track password visibility

  const showLoadingToast = () => {
    return toast.loading('Loggin in...', {
      position: 'top-center',
      duration: Infinity, // The toast will not automatically close
    })
  }

  const userLoginState = useLoginState()

  // Login Form submit
  const HandleSubmit = async (e) => {
    const loadingToastId = showLoadingToast()
    try {
      e.preventDefault()
      const email = textfield.email
      const password = textfield.password

      const response = await axios.post(API_URL, { email, password })
      const userType = await response.data.userType

      toast.dismiss(loadingToastId)

      // Passing user email to refrence user is logged in , userType to refrence what user ROLE is
      userLoginState.login(email, userType)
      if (userType === 'normal_user') {
        toast.success('Login Success')
        navigate('/', { replace: true })
      } else if (userType === 'admin_user') {
        // Hard reload into ADMIN Page
        window.location.href = '/admin'
      }
    } catch (error) {
      toast.dismiss(loadingToastId)
      // console.log('ERROR : ', error.response)

      if (error.response.data.ENTER_OTP === true) {
        navigate('/otp', { replace: true })
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Display the 'if' error message from the backend to frontend
        const error_message = error.response.data.message
        // console.log(error_message)
        toast.error(error_message)
      }
    }
  }

  const HandleOnChange = (event) => {
    const field_name = event.target.name
    const field_value = event.target.value

    setTextField({ ...textfield, [field_name]: field_value })
  }

  useEffect(() => {
    refUsername.current.focus()
  }, [])

  return (
    <div className="container_form relative">
      <div className="absolute w-[90%] h-[40px] top-[20px] flex items-center justify-between backdrop-blur-sm bg-white/30 rounded-xl">
        <div className="w-[50%] h-[80%] flex items-center ">
          <img src={LogoIU} alt="Logo_IU" className="w-[5%] h-[100%] rounded-full ml-8"/>
          <p className="h-[100%] text-[1.2rem] text-white ml-2 mt-auto">Internationl University</p>
        </div>
        <div className="w-[50%] flex items-center justify-center">
          <ul className="flex flex-row m-auto text-[1.1rem] text-[#606060] cursor-pointer">
            <li className="mr-6">Contact</li>
            <li className="mr-6">Quick Links</li>
            <Link to="/" style={{textDecoration: "none"}}><li className="mr-6">Home</li></Link>
            <li>Guides</li>
          </ul>
        </div>
      </div>
      <Form onSubmit={HandleSubmit} className="w-[35%] h-[70%] backdrop-sepia-0 bg-white/60 border-solid border-4 border-white/50 rounded-xl flex items-center flex-col ">
        <h1 className="login-form_title text-[1.8rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] text-[#318CE7]">E-Library</h1>
        <GiSecretBook className="text-[2rem] text-[#008B8B] "/>
       
        <div className="w-[75%] my-[20px]">
        
            <input
           placeholder='Enter Email'
           value={textfield.email}
            onChange={HandleOnChange}
           name='email'
           autoComplete='off'
           required
           ref={refUsername}
           type='email' className="login-form_input" />
        </div>

        <div className="w-[75%] my-[20px] relative">
        
          <input
               type={showPassword ? 'text' : 'password'} 
               placeholder='Enter Password'
               value={textfield.password}
               onChange={HandleOnChange}
               name='password'
               autoComplete='off'
               required
               className="login-form_input "
             />
             <span
               onClick={() =>
                 setShowPassword((prevShowPassword) => !prevShowPassword)
               }
               style={{ cursor: 'pointer' }}
               className="text-[1.2rem] absolute  right-[10px] top-0 translate-y-[55%]"
             >
               {showPassword ? <BsEye /> : <BsEyeSlash />}
             </span>


        </div>

        <Form.Group className="mb-3 w-[75%]">
          <Button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#111727",
              border: "none",
            }}
          >
            Login
          </Button>
        </Form.Group>
        <Link  to='/forgotpassword'
          className="pt-3 text-center cursor-pointer"
        >
          Forgot your password?
        </Link>
        <p className='mx-[30px] text-[1.25rem] mt-3'>Don't have account? Fill out the <Link to="/signup">form</Link> to create a library account</p>
      </Form>
    </div>
  )
}

export default Login
