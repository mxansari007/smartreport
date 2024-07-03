import React from 'react'
import BeforeLoginNav from '../../components/BeforeLoginNav.jsx';
import Card from '../../components/Card.jsx';


const LandingPage = () => {
  return (
    <div className="bg-[#0A5BA5]">
    <BeforeLoginNav/>
    <div className='flex h-screen items-center justify-center'>
    <div className='flex flex-wrap container gap-3'>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      </div>
    </div>
    </div>
  )
}

export default LandingPage