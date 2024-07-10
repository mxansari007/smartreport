import React, { useEffect } from 'react'
import BeforeLoginNav from '../../components/BeforeLoginNav.jsx';
import Card from '../../components/Card.jsx';
import axios from 'axios';

const LandingPage = () => {

  const [tests, setTests] = React.useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: import.meta.env.VITE_BASE_URL + '/api/v1/tests',
          params: {
            limit: 4
          }
        })
        setTests(response.data.data);
      } catch (error) {
        console.error(error)
      }
    })()
  }
  , [])



  return (
    <div className="bg-[#0A5BA5] min-h-screen">
    <BeforeLoginNav/>
    <div className='flex mt-10'>
    <div className='flex flex-wrap container gap-3'>
      {tests.map(d=><Card key={d.id} data={d}/>)}
      </div>
    </div>
    </div>
  )
}

export default LandingPage