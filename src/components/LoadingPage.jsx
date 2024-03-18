import React from 'react'
import Loading from '../assets/bouncing-circles.svg';

const LoadingPage = () => {
  return (
    <div className='z-50 w-full fixed top-0 left-0 h-screen flex justify-center items-center backdrop-blur-sm'>
      <div className='bg-black h-screen w-full fixed top-0 left-0 z-40 opacity-50'></div>
        <div className='w-[200px] z-50'>
              <img src={Loading} alt='loading' />
        </div>
    </div>
  )
}

export default LoadingPage