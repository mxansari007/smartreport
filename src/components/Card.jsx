import React from 'react'
import {Button} from '../@/components/ui/button';


const Card = ({data}) => {
  return (
    <div className='md:w-[400px] border-2 bg-white'>
        <div className='p-4 flex justify-between '>
            <h1 className='text-2xl text-gray-500 roboto-semibold'>{data.name}</h1>
            <p>Parameters: <span className='roboto-light'>{data.parameters.length}</span></p>
        </div>
        <div>
            <p className='text-gray-500 roboto-regular p-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac nunc nec nunc aliquet tincidunt. Nullam ac nunc nec nunc aliquet tincidunt.</p>
        </div>
        <div className='p-4'>
            <Button className='w-full bg-[#0077ff] hover:bg-blue-500 text-white'>Book Test</Button>
        </div>
    </div>
  )
}

export default Card