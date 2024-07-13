import React, { useEffect } from 'react'
import {Button} from '../@/components/ui/button';
import { CartContext } from '../contexts/CartContext';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';



const Card = ({data}) => {

  const {cart,setCart} = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(cart))}
  , [cart])

    

  const setToCart = () => {
    let flag = false;
    cart.data.forEach((d)=>{
      if(d._id == data._id){
        flag = true;
        toast.warn('Already in cart');
        return;
      }
    })
    if(flag) {
      return
    };
    data.quantity = 1;
    setCart({data:[...cart.data,data],totalQuantity:cart.totalQuantity+1,totalPrice:cart.totalPrice+data.price})
  }


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
            <Button 
            className='w-full bg-[#0077ff] hover:bg-blue-500 text-white'
            onClick={()=>{
              setToCart()
            }}
            >
            Book Test
            </Button>
        </div>
    <ToastContainer />
    </div>
  )
}

export default Card