import React, { useEffect, useState } from "react";
import { Label } from "../@/components/ui/label";
import { Input } from "../@/components/ui/input";
import { Button } from "../@/components/ui/button";
import axios from 'axios';
import { useNavigate } from "react-router";
import bgImage from '../assets/img.png';
import 'react-phone-input-2/lib/style.css'
import {authentication} from '../firebaseConfig';
import { signInWithPhoneNumber,RecaptchaVerifier,PhoneAuthProvider,signInWithCredential } from "firebase/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../@/components/ui/input-otp"





import LoadingPage from '../components/LoadingPage';
import { Link } from "react-router-dom";

function Login() {

  const [phone,setPhone] = useState('');
  const [otp,setOtp] = useState('');
  const Navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [step,setStep] = useState(1);



  useEffect(()=>{
    console.log(phone);
  },[phone])



  // const handleUser = (e)=>{
  //     setUserId(e.target.value);
  // }

  // const handleLogin = ()=>{
  //   console.log('clicked')
  //   setLoading(true);
  //     ;(async ()=>{
  //       try{
  //        const res = await axios({
  //         url:import.meta.env.VITE_BASE_URL + '/user/loginUser',
  //         method:"POST",
  //         data:{userId:userId},
  //         withCredentials:true
  //        })

  //        console.log(res.data);
  //        localStorage.setItem('user',JSON.stringify(res.data));
  //        setLoading(false);
  //        Navigator('/dashboard');


  //       }catch(err){
  //         console.log(err);
  //         setLoading(false);
  //       }
  //     })()
  // }


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

const sendVerification =()=>{
  onCaptchaVerify();
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(authentication, phone, appVerifier)
  .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).

    // Save the confirmationResult.
    setStep(2);
    setVerificationId(confirmationResult.verificationId);
    
  })
  .catch((error) => {
    // Error; SMS not sent
    // ...
    console.log(error);
  });
 
}

const confirmOtp = ()=>{
  const credential = PhoneAuthProvider.credential(verificationId, otp);
  signInWithCredential(authentication, credential)
    .then((result) => {
      console.log("User signed in");
      console.log(result);
    }).catch((error) => {
      console.error("Error during signInWithCredential", error);
    });
}







  return (
    <>
      <div className="min-h-screen bg-[#60A5FA] flex">
        <div className="">
          <img className="h-screen bg-cover bg-origin-content bg-no-repeat" src={bgImage} alt='bgImage' />
        </div>
        <div className="flex-1 flex flex-col justify-center items-start bg-[#1E40AF] text-white p-12 ">
          <h1 className="text-4xl font-bold mx-8 mb-8">Welcome To <br/>SMART REPORT</h1>
          
          {step===1?<div className="flex flex-col w-[300px]">
          <Label htmlFor="user-id" className="text-[#F59E0B] font-bold mx-8 mb-3">Enter Your Mobile Number</Label>
         <Input onChange={(e)=>{
          setPhone('+91'+e.target.value);
         }} className="w-[300px] text-black mx-8 mb-4" />
          <Button id="sign-in-button" onClick={()=>sendVerification()} className="w-[300px] bg-[#F59E0B] text-white text-sm mx-8 mb-10">Send OTP</Button>
          </div>:null}
          
          
          
          {step==2?<div className="w-full flex flex-col mx-8">
          <Label htmlFor="otp" className="text-[#F59E0B] font-bold mx-8 mb-3">Enter OTP</Label>

          <div className="w-[300px]">    
          <InputOTP maxLength={6}>
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
          </div>
          :null}
        

        <div className="mt-6">
            <h2 className="text-xl">Login As : <span className="text-md hover:text-black"><Link to="/manager">Manager</Link></span> / <span className="text-md hover:text-black"><Link to="/manager">Admin</Link></span></h2>
        </div>
        
        </div>


        {loading?<LoadingPage />:<></>}
      </div>
    </>
  );
}

export default Login;
