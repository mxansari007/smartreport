import axios from 'axios';
import { useEffect } from 'react';
import male from '../assets/male.svg';
import Malebody from '../components/Malebody';
import Line1 from '../components/Line1';
import Reportcontainer from '../components/Reportcontainer.jsx';
import Kidney from '../components/Kidney.jsx';
import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';


import Pdf from '../components/Pdf.jsx';

const Report = () => {

    const [height, setHeight] = useState(500);
    const [kidney, setKidney] = useState(0);
    const [mainHeight,setMainHeight] = useState('1200px')

    // useEffect(() => {
    //     const cal = parseInt(50*height/100);
    //     setKidney(cal);
    //     console.log(cal)
    // }, [height]);  // Only run the effect when `height` changes

    const getTest = ()=>{
        ;(async ()=>{

            try{

                const myres = await axios('/api/user/getTest');

                console.log(myres);


            }catch(err){

                console.log(err);

            }

        })()
    }
 
  return (
    <div className='flex flex-col min-h-screen w-[100%] bg-[#0077ff]'>
    <div className='mb-6'>
    <Navbar />
    </div>
    <Pdf />
    </div>
  )
}

export default Report