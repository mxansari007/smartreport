import React from 'react'
import ManagerNav from '../../components/ManagerNav.jsx'
import test from '../../assets/tests.png'
import lab from '../../assets/lab.png'
import labadmin from '../../assets/labadmin.png'
import { useNavigate } from 'react-router-dom'



const Dashboard = () => {
  const Navigator = useNavigate();

  return (
    <div className='w-full h-screen bg-[#0A5BA5]'>
    <ManagerNav/> 
    <div className='container flex-1 flex h-full'>

      <div className='mt-10 flex items-start gap-8'>

        <div onClick={()=>{Navigator('/manager/tests')}} className='cursor-pointer hover:bg-blue-600 hover:shadow-xl p-4 rounded-md flex flex-col items-center justify-center gap-2'>
          <div className='w-40 h-40 rounded-xl bg-yellow-400 flex justify-center items-center'>
            <img src={test} alt='test' className=''/>
          </div>
          <p className='text-xl text-white font-semibold'>Manage Tests</p>
          </div>

        <div onClick={()=>{
          Navigator('/manager/labs')
        }} className='cursor-pointer hover:bg-blue-600 hover:shadow-xl p-4 rounded-md flex flex-col items-center justify-center gap-2'>
          <div className='w-40 h-40 rounded-xl bg-yellow-400 flex justify-center items-center'>
            <img src={lab} alt='test' className=''/>
          </div>
          <p className='text-xl text-white font-semibold'>Manage Labs</p>
          </div>

        <div onClick={()=>{
          Navigator('/manager/labadmin')
        }} className='cursor-pointer hover:bg-blue-600 hover:shadow-xl p-4 rounded-md flex flex-col items-center justify-center gap-2'>
          <div className='w-40 h-40 rounded-xl bg-yellow-400 flex justify-center items-center'>
            <img src={labadmin} alt='test' className=''/>
          </div>
          <p className='text-xl text-white font-semibold'>Manage Lab Admins</p>
          </div>


      </div>

    </div>
    </div>
  )
}

export default Dashboard

