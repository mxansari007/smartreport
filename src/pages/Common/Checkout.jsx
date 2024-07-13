import React, { useEffect } from 'react'
import {Card,CardHeader,CardTitle,CardDescription,
  CardContent,CardFooter
} from '../../@/components/ui/card';
import LoadingPage from '../../components/LoadingPage';
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger } from '../../@/components/ui/dialog';
import { Label } from '../../@/components/ui/label';
import { Input } from '../../@/components/ui/input';
import {Button} from '../../@/components/ui/button';
import { TERipple } from "tw-elements-react";

const Checkout = () => {

  const [login, setLogin] = React.useState('pending');
  const [step, setStep] = React.useState(1);
  const [cart, setCart] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    setCart(cartData.data);
    setTotal(cartData.totalPrice);

    if( localStorage.getItem('patient')===undefined || localStorage.getItem('patient')===null){
      setLogin('false');
      console.log('clicked')
      return;
    }else{
      setLogin('true');
    }
  }
  , [])

  useEffect(() => { 
    console.log(cart,total);
  }, [cart])

  useEffect(() => {
    if(login==='false'){
      document.getElementById('loginTrigger').click();
    }
  }
  , [login])
  
  return (
    <>
    <div className='min-h-screen bg-[#a3ccf2]'>
    <div className='container pt-20 px-10'>
    <h1 className='text-3xl text-yellow-200'>Checkout</h1>
    <div className='flex gap-4'>
      <div className='rounded-md shadow-2xl bg-white min-h-40 flex-[8]'>
    
      {cart.map(d=><div className='flex p-10 border gap-10'>
        <div>
          <h2 className='text-xl'>{d.name}</h2>
          <p className='text-sm text-gray-500'>lorem ipusum some description</p>
        </div>
        <div>
        </div>
        <div>
          <p>₹{d.price * d.quantity}</p>
        </div>
        <div>
          <TERipple>
          <Button className="bg-red-500 hover:bg-red-400">Remove</Button>
          </TERipple>
        </div>
      </div>)}


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
                <p>₹{total}</p>
              </div>
              <div className='flex justify-between'>
                <p>Delivery Charges</p>
                <p>₹70</p>
              </div>
              <div className='flex justify-between'>
                <p>Total</p>
                <p>₹{total + 70}</p>
              </div>
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button >Proceed to Checkout</Button>
          </CardFooter>
        </Card>

      </div>
      </div>
      </div> 
    </div>    
    {login==='pending'?<LoadingPage/>:null}    

    <Dialog open={login==='true'?false:true} >
      <DialogTrigger>
      <p id="loginTrigger" className='hidden'></p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>You need to sign in to proceed with the checkout</p>
        </DialogDescription>
        
        {step===1?<><Label>Enter Your Phone Number</Label>
        <Input type='text' placeholder='Enter your phone number'/>
        <Button onClick={()=>{
          setStep(2);
        }
        }>Sign In</Button>
        </>:null}

        {step==2?<>
          <Label>Enter OTP</Label>
          <Input type='text' placeholder='Enter OTP'/>
          <Button onClick={()=>setLogin('true')}>Confirm OTP</Button>
        </>:null}

      </DialogContent>
    </Dialog>
    </>

)
}

export default Checkout