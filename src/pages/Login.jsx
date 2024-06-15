import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useNavigate } from "react-router";
import bgImage from '../assets/img.png';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {authentication} from '../firebaseConfig';
import { signInWithPhoneNumber,RecaptchaVerifier,PhoneAuthProvider,signInWithCredential } from "firebase/auth";





import LoadingPage from '../components/LoadingPage';

function Login() {

  const [phone,setPhone] = useState('');
  const [otp,setOtp] = useState('');
  const Navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState('');



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
          <Label htmlFor="user-id" className="text-[#F59E0B] font-bold mx-8 mb-3">Enter Your Mobile Number</Label>
         <Input onChange={(e)=>{
          setPhone(e.target.value);
         }} className="w-3/6 md:w-600px mx-8 mb-4" />
          <Button id="sign-in-button" onClick={()=>sendVerification()} className="w-3/6 bg-[#F59E0B] text-white text-sm mx-8 mb-10">Send OTP</Button>
          <Input onChange={(e)=>{setOtp(e.target.value)}} className="w-3/6 md:w-600px mx-8 mb-4" />
          <Button  id="sign-in-button" onClick={()=>{confirmOtp()}} className="w-3/6 bg-[#F59E0B] text-white text-sm mx-8">Verify OTP</Button>
        </div>
        {loading?<LoadingPage />:<></>}
      </div>
    </>
  );
}

export default Login;
