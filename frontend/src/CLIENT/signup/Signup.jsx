import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const Signup = () => {
  const API_URL = 'http://localhost:5000/api/v1/signup'

  const refUsername = useRef(null)

  const Empty_Form_Field = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  }

  const navigate = useNavigate()

  const [textField, setTextField] = useState(Empty_Form_Field)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false) // State variable to track password visibility

  const showLoadingToast = () => {
    return toast.loading('Registering User...', {
      position: 'top-center',
      duration: Infinity, // The toast will not automatically close
    })
  }

  const HandleFormSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)

      // Validate email format
      const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/
      const isValid = emailRegex.test(textField.email)
      // console.log(isValid)
      if (!isValid) {
        setLoading(false)
        return toast('Invalid Email Format', {
          icon: 'ℹ️',
        })
      }

      // Validate alphanumeric password with a must Special character
      const alphanumericRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      const isPasswordValid = alphanumericRegex.test(textField.password)
      if (!isPasswordValid) {
        setLoading(false)
        return toast(
          'Password must be alphanumeric and contain at least one special character',
          {
            icon: 'ℹ️',
          }
        )
      }

      if (textField.password !== textField.confirm_password) {
        setLoading(false)
        return toast('Password doesnt match', {
          icon: 'ℹ️',
        })
      }

      const loadingToastId = showLoadingToast()

      const username = textField.username
      const email = textField.email
      const phone = textField.phone
      const password = textField.password

      const response = await axios.post(API_URL, {
        username,
        email,
        phone,
        password,
      })

      toast.dismiss(loadingToastId)

      setTextField(Empty_Form_Field)
      setLoading(false)

      if (response.data.GOTO_LOGIN == true) {
        navigate('/login', { replace: true })
        toast('Account Already Exists , You can Login ! ', {
          icon: 'ℹ️',
        })
      } else {
        navigate('/otp', { replace: true })
        toast(response.data.message, {
          icon: 'ℹ️',
        })
      }
    } catch (error) {
      console.log(error)
      console.log(error.response)
      // const userAlreadyExists = error.response.data.message
      // toast.error(userAlreadyExists)
      // setErrorFeedback('Invalid Format')
    }
  }

  const HandleOnChange = (event) => {
    const field_name = event.target.name
    const field_value = event.target.value

    setTextField({ ...textField, [field_name]: field_value })
  }
  useEffect(() => {
    refUsername.current.focus()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center mt-16 ">
    <div className='w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 '>
      <h1 className='text-xl text-center font-bold text-gray-900 md:text-2xl '>
        Form Request Account
      </h1>
      <form className='space-y-6 mt-5' onSubmit={HandleFormSubmit} method='post'>
        <div>
          <label
            className='block mb-2 text-sm font-medium text-gray-900 '
            htmlFor='usernamefield'
          >
            Student name
          </label>
          <input
                 type='text'
                 placeholder='Enter name..'
                 id='usernamefield'
                 value={textField.username}
                 onChange={HandleOnChange}
                 name='username'
                 autoComplete='off'
                 required
                ref={refUsername}
               maxLength='20'
               minLength='5'
               className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
             />
        </div>
        <div>
          <label
            htmlFor='emailfield'
            className='block mb-2 text-sm font-medium text-gray-900 '
          >
            Email Student
          </label>
        
          <input
                 type='email'
                 placeholder='e.g. user@gmail.com'
                 id='emailfield'
                 value={textField.email}
                 onChange={HandleOnChange}
                 name='email'
                 autoComplete='off'
                 required
                 className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '

               />
        </div>
        <div>
          <label
             htmlFor='phonefield'
            className='block mb-2 text-sm font-medium text-gray-900 '
          >
            Phone
          </label>
           <input
             type='text'
             placeholder='e.g. 98...'
             id='phonefield'
             value={textField.phone}
             onChange={HandleOnChange}
             name='phone'
             autoComplete='off'
             required
             pattern='9\d{9}'
             minLength='10'
             maxLength='10'
             className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '

           />
        </div>
        <div>
          <label
            htmlFor='passwordfield'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Password
          </label>
                 <input
                   type={showPassword ? 'text' : 'password'}
                  //  type='password'
                   placeholder='Enter Password'
                   id='passwordfield'
                   value={textField.password}
                   onChange={HandleOnChange}
                   name='password'
                   autoComplete='off'
                   required
                   minLength='5'
                   className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '

                 />
              
        </div>
        <div className='relative'>
          <label
            htmlFor='passwordfield2'
            className='block mb-2 text-sm font-medium text-gray-900'
          >
            Confirm Password
          </label>
                 <input
                   type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                   placeholder='Confirm Password'
                   id='passwordfield2'
                   value={textField.confirm_password}
                   onChange={HandleOnChange}
                   name='confirm_password'
                   autoComplete='off'
                   required
                   minLength='5'
                   className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                 />
                 <span
                   onClick={() =>
                     setShowPassword((prevShowPassword) => !prevShowPassword)
                   }
                   style={{ cursor: 'pointer' }}
                   className='text-[1.2rem] absolute right-[10px] top-[55%]'
                 >
                   {showPassword ? <BsEye /> : <BsEyeSlash />}
                 </span>
        </div>
        <div className='flex items-start'>
          <div className='flex items-center h-5'>
            <input
              id='terms'
              aria-describedby='terms'
              type='checkbox'
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
              required={true}
            />
          </div>
          <div className='ml-3 text-sm'>
            <label
              htmlFor='terms'
              className='font-light text-gray-500 dark:text-gray-300'
            >
              I accept the{" "}
              <a
                className='font-medium text-primary-600 text-blue-700 hover:underline dark:text-blue-500'
                href='#'
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        <button
        disabled={loading}
          type='submit'
          className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
          Not registered?{" "}
          <Link
            to="/login"
            className='text-blue-700 hover:underline dark:text-blue-500'
          >
            Login here
          </Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Signup
