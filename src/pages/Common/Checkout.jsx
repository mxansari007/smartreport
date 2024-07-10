import React from 'react'
import {Card,CardHeader,CardTitle,CardDescription,
  CardContent,CardFooter
} from '../../@/components/ui/card';

const Checkout = () => {

  
  return (
    <>
    <div className='min-h-screen bg-[#a3ccf2]'>
    <div className='container pt-20 px-10'>
    <h1 className='text-3xl text-yellow-200'>Checkout</h1>
    <div className='flex gap-4'>
      <div className='rounded-md shadow-2xl bg-white min-h-40 flex-[8]'>
    
      <div className='flex p-10 border gap-10'>
        <div>
          <h2 className='text-xl'>Test Name</h2>
          <p className='text-sm text-gray-500'>lorem ipusum some description</p>
        </div>
        <div>
        <div className='flex'>
          <button className='rounded-l-full border p-[1px] w-[30px]'>+</button>
          <div className='border w-[40px] flex justify-center'><p>1</p></div>
          <button className='rounded-r-full border p-[1px] w-[30px]'>-</button>
          </div>
        </div>
        <div>
          <p>$100</p>
        </div>
        <div>
          <button className='text-red-500'>Remove</button>
        </div>
      </div>


      </div>
      <div className='rounded-md shadow-2xl bg-white min-h-40 flex-[4]'>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>$100</p>
              </div>
              <div className='flex justify-between'>
                <p>Shipping</p>
                <p>$10</p>
              </div>
              <div className='flex justify-between'>
                <p>Total</p>
                <p>$110</p>
              </div>
            </CardDescription>
          </CardContent>
          <CardFooter>
            <button className='bg-blue-500 text-white p-2 rounded-md'>Proceed to Checkout</button>
          </CardFooter>
        </Card>

      </div>
      </div>
      </div> 
    </div>        
    </>

)
}

export default Checkout