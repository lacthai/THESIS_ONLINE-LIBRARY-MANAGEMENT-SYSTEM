import React from 'react'
import './otpform.css'
import { backend_server } from '../../main'
import axios from 'axios'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Modal} from "react-bootstrap";

const OtpForm = () => {
  const OTP_VERIFY_API = `${backend_server}/api/v1/signup/verifyEmail`
  const RESEND_OTP_API = `${backend_server}/api/v1/signup/resendOtp`

  const [otp_code, setOtp_code] = useState('')
  const [loading, setLoading] = useState(false)
  const [showTerm, setShowTerm] = useState(false);

  const handleCloseTerm = () => setShowTerm(false);
  const handleShowTerm = () => setShowTerm(true);
  const navigate = useNavigate()

  const showLoadingToast = () => {
    return toast.loading('Sending otp code ...', {
      position: 'top-center',
      duration: Infinity, // The toast will not automatically close
    })
  }

  const handleVerifyFormSubmit = async () => {
    try {
      const response = await axios.post(OTP_VERIFY_API, { otpCode: otp_code })

      toast.success(response.data.message)

      navigate('/login', { replace: true })
    } catch (error) {
      console.log(error.response)
      if (error.response.data.success == false) {
        // toast.error(error.response.data.message)
        toast(error.response.data.message, {
          icon: 'ℹ️',
        })
      }
    }
  }

  const handleResendFormSubmit = async () => {
    setLoading(true)
    const loadingToastId = showLoadingToast()
    try {
      const response = await axios.post(RESEND_OTP_API, {})

      toast.dismiss(loadingToastId)

      toast(response.data.message, {
        icon: 'ℹ️',
      })

      setLoading(false)
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='otp_banner h-[100vh] overflow-hidden flex justify-center items-center'> 
   
    <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
        <h1 className="text-xl text-center font-bold text-gray-900 md:text-2xl ">
          Email Verification Form
        </h1>
        <form className="space-y-6 mt-5" onSubmit={handleFormSubmit}>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 "
              htmlFor="usernamefield"
            >
              Enter your <strong>OTP</strong> code :{' '}
            </label>
            <input
              type="text"
              placeholder="Enter your email.."
              value={otp_code}
              onChange={(e) => setOtp_code(e.target.value)}
              name='otpCode'
              autoComplete="off"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                <Modal show={showTerm} onHide={handleCloseTerm} className='flex justify-center items-center'>
                <Modal.Header closeButton>
                  <Modal.Title>Terms and Conditions</Modal.Title>
                </Modal.Header>
                  <Modal.Body>
                    <div className="h-[80px] flex justify-center items-center mb-4">
                      <img src="./logo_IU_circle.png" alt="" className='h-[100%]'/>
                    </div>
                    <ul className='list-disc'>
                      <li>Enter the <span className=' font-semibold'>"OTP code"</span> sent to the gmail used to register</li>
                      <li>If you do not receive the <span className=' font-semibold'>"OTP code"</span>, you can request to resend the code</li>
                      <li>The <span className=' font-semibold'>"OTP code"</span> only lasts for 60 seconds and then you cannot use the old code</li>
                    </ul>
                  </Modal.Body>
                  <div className="h-[250px] flex justify-center items-center mb-4">
                      <img src="./otp_verify.jpg" alt="" className='h-[100%] w-[300px]'/>
                    </div>
              </Modal>
              </label>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleVerifyFormSubmit}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button
            className="w-full text-white bg-[#393e46] hover:bg-[#7e858b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={loading}
            onClick={handleResendFormSubmit}
          >
            {loading ? 'Sending Otp...' : 'Re-send Otp'}
          </button>
        </form>       
      </div>
    </div>
  )
}

export default OtpForm
