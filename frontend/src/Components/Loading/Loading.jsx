import React from 'react'
import {HashLoader} from 'react-spinners';

const Loading = () => {
  return (
    <div className=' my-4 h-[200px] flex justify-center items-center'>
        <HashLoader 
        color="#36d7b7" 
        size={100}
        />
    </div>
  )
}

export default Loading