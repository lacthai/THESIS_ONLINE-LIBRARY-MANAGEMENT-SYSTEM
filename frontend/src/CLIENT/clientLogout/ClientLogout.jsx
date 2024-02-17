import React from 'react'
import { backend_server } from '../../main'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLoginState } from '../../LoginState'

const ClientLogout = () => {
  const logout_Api_url = `${backend_server}/api/v1/logout`

  const userLoginState = useLoginState()

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // reset OR set user login state to NULL
      userLoginState.logout()

      // Clear cookie using API
      await axios.post(logout_Api_url)

      navigate('/', { replace: true })
        window.location.reload();
     
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div className='container h-[100vh] flex flex-col justify-center items-center'>
      <div className='row'>
        <div className='col text-center'>
          <img
            className='img-fluid rounded-3xl'
            src='/logout.png'
            alt=''
            style={{ width: '500px' }}
          />

          <h3 className='h3 dark:text-[#303030] text-[#e0e0e0] mt-3'>Are you sure, you want to Logout ? </h3>

          <button className='btn btn-success mx-5 my-3 bg-[#6a5af9] dark:bg-[#4cceac] border-none' onClick={handleLogout}>
            Yes
          </button>

          <button className='btn btn-secondary' onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClientLogout
