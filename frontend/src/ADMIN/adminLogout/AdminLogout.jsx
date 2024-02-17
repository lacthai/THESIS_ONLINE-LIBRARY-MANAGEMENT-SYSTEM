import React from 'react'
import { backend_server } from '../../main'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLoginState } from '../../LoginState'

const AdminLogout = () => {
  const logout_Api_url = `${backend_server}/api/v1/logout`

  const navigate = useNavigate()

  const userLoginState = useLoginState()

  const handleLogout = async () => {
    try {
      localStorage.clear()

      // Clear cookie using API
      const resp = await axios.post(logout_Api_url)
      console.log(resp)

      window.location.href = '/'
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div className='container h-[110vh] flex justify-center items-center'>
      <div className='row'>
        <div className='flex flex-col justify-center items-center'>
          <img
            className='img-fluid rounded-3xl'
            src='/logout.png'
            alt=''
            style={{ width: '350px' }}
          />

          <h3 className='h3 dark:text-[#303030] text-[#e0e0e0] font-semibold mt-4'>Are you sure, you want to Logout ? </h3>

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

export default AdminLogout
