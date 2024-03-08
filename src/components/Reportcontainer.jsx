import '../styles/reportcontainer.css';


import React from 'react'

const Reportcontainer = () => {
  return (
    <div id="report-container" className='w-[300px] h-[200px] shadow-md bg-white rounded-md'>
        <div className='flex p-4'>
            <div className='flex-[4]'>
                <p>parameter 1:</p>
                <p>parameter 2:</p>
                <p>parameter 3:</p>
                <p>parameter 3:</p>
            </div>
            <div className='flex-1'>
                <p>123</p>
                <p>123</p>
                <p>123</p>
                <p>123</p>
            </div>
        </div>
    </div>
  )
}

export default Reportcontainer