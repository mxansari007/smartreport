import React, { useEffect, useState } from "react";
import { Label } from "../../@/components/ui/label";
import { Input } from "../../@/components/ui/input";
import { Button } from "../../@/components/ui/button";
import axios from 'axios';
import { useNavigate } from "react-router";
import bgImage from '../../assets/img.png';
import 'react-phone-input-2/lib/style.css'
import {authentication} from '../../firebaseConfig';
import { signInWithPhoneNumber,RecaptchaVerifier,PhoneAuthProvider,signInWithCredential } from "firebase/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../@/components/ui/input-otp"

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";

import loginMobile from '../../assets/login-mobile.png';




import LoadingPage from '../../components/LoadingPage';
import { set } from "react-hook-form";

function Login() {



  const [phone,setPhone] = useState('');
  const [otp,setOtp] = useState('');
  const Navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [step,setStep] = useState(1);
  const [time,setTime] = useState(15);
  const [myInterval,setMyInterval] = useState(null);




  useEffect(()=>{
    console.log(phone);
  },[phone])



  const verifyBefore =()=> new Promise ((res,rej)=>{
    
    ;(async ()=>{
        try{
            const result = await axios({
            url:import.meta.env.VITE_BASE_URL + '/api/v1/users/isUserExist',
            data:{phone:phone.split('+91')[1]},
            method:'POST',
            withCredentials:true
            })

            if(result.data.success){
                res({status:true,message:'Manager Found'});
            }else{
                rej({status:false,message:'Manager Not Found'});
            }
        
        }catch(error){
            if(error.response.status===404){
            rej({status:false,message:'Manager Not Found'});
            }
            else{
            rej({status:false,message:'Ingeral Server Error'});
            }
        }

    })()
   
});

  function onCaptchaVerify(){
    console.log('clicked')
    if(!window.reCaptchaVerifier){
      window.recaptchaVerifier = new RecaptchaVerifier(authentication, 'sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        }
      });
    }
  }

const sendVerification =async ()=>{
  window.recaptchaVerifier = null;
  onCaptchaVerify();
  const appVerifier = window.recaptchaVerifier;
  setLoading(true);

    verifyBefore().then((result)=>{
        if(result.status){
            signInWithPhoneNumber(authentication, phone, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).

                // Save the confirmationResult.
                setLoading(false);
                setStep(2);
                setVerificationId(confirmationResult.verificationId);
                
            })
            .catch((error) => {
                // Error; SMS not sent
                // ...
                console.log(error);
            });

            }else{
                toast.error(result.message);
                setLoading(false);

            }
        }).catch((error)=>{
            toast.error(error.message);
            setLoading(false);  

        })
 
}

const loginManager = async ()=>{
  setLoading(true);
  try{
    const res = await axios({
      url:import.meta.env.VITE_BASE_URL + '/api/v1/users/login',
      method:'POST',
      data:{phone:phone.split('+91')[1],role:"manager"},
      withCredentials:true
    })
    localStorage.setItem('token',res.data.token);
    Navigator('/manager/dashboard');
  }catch(error){
    console.log(error);
    toast.error('Manager Not Found');
    setLoading(false);
  }
}

const confirmOtp = ()=>{
    setLoading(true);
  const credential = PhoneAuthProvider.credential(verificationId, otp);
  signInWithCredential(authentication, credential)
    .then((result) => {
        console.log("Signed in with phone number");
        loginManager();

      }).catch((error) => {
        setLoading(false);
      console.error("Error during signInWithCredential", error);
    });
}







  return (
    <>
      <div className="min-h-screen bg-white flex md:flex-row flex-col">
        <div className="flex-1 p-4 md:p-0 flex justify-center bg-blue-300">

          <img className="hidden md:block w-full h-screen " src={bgImage} alt='bgImage' />
          <img className="md:hidden visible w-[300px]" src={loginMobile} />
        </div>
        <div className="flex-[2] flex flex-col items-start bg-[#1E40AF] text-white p-12 ">
        <h1 className="mb-4 md:mb-0 text-bold text-xl bg-blue-600 px-6 py-2 rounded-full">Lab Admin</h1>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className=" font-bold mx-8 mb-8">Welcome To <br/>SMART REPORT</h1>
          
          {step===1?<div className="flex flex-col">
          <Label htmlFor="user-id" className="text-[#F59E0B] font-bold mx-8 mb-3">Enter Your Mobile Number</Label>
         <Input onChange={(e)=>{
          setPhone('+91'+e.target.value);
         }} className="w-full md:w-[300px] text-black mx-2 md:mx-8 mb-4" />
          <Button id="sign-in-button" onClick={()=>{
            // sendVerification()
            Navigator('/labadmin/dashboard')
            }} className="w-full md:w-[300px] bg-[#F59E0B] hover:bg-yellow-400 text-white text-sm mx-2 md:mx-8 mb-10">Send OTP</Button>
          </div>:null}
          
          
          
          {step==2?<div className="w-full flex flex-col mx-8">
          <Label htmlFor="otp" className="text-[#F59E0B] font-bold mx-8 mb-3">Enter OTP</Label>

          <div className="w-[300px]">    
          <InputOTP onChange={(e)=>{setOtp(e)}} maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        </div>

          <Button  id="sign-in-button" onClick={()=>{confirmOtp()}} className="w-[300px] mt-6 bg-[#F59E0B] text-white text-sm">Verify OTP</Button>
          <p className="mt-4">Resend OTP {time!==0?`in : ${time}`:<>
          <span className="text-blue-500 cursor-pointer" onClick={()=>{sendVerification();setTime(-1)}}>Resend</span>
          </>}</p>
          </div>
          :null}

          <div className="mt-6">
            <h2 className="text-xl">Login As : <span className="text-md hover:text-black"><Link to="/">Patient</Link></span> / <span className="text-md hover:text-black"><Link to="/manager">Admin</Link></span></h2>
        </div>
          </div>
        
        
        </div>


        {loading?<LoadingPage />:<></>}
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;