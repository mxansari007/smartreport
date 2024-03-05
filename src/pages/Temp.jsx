import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '../components/ui/button'
import { authentication } from '../firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber  } from 'firebase/auth';
import axios from 'axios';



const Roles = () => {
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [otp, setOTP] = useState();

  const generateRecaptcha = ()=>{
    window.recaptchaVerifier = new RecaptchaVerifier(authentication, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.

      }
    },authentication);
  }

  const handleSend = ()=>{
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authentication,phoneNumber,appVerifier)
    .then(confirmationResult=>{window.confirmationResult=confirmationResult})
    .catch(err=>{console.log(err)})

  }



  const VerifyOTP = ()=>{
    confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      ;(async ()=>{
        try{
            const res = await axios({
              method:'post',
              url:'/api/user/createUser',
              data:{mobile:user.phoneNumber},
            });

            console.log(res);
        }catch(err){console.log(err)}
      })()
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      console.log(error);
      // ...
    });
  }

  const handleOTP = (e)=>{
    setOTP(e.target.value);
  }

  const handlePhone = (e)=>{
    setPhoneNumber('+91'+e.target.value);
  }


  return (
    <div>
        <Input onChange={handlePhone} type="number"/>
        <Button id="recaptcha-container" onClick={handleSend}>Send</Button>
        <Input onChange={handleOTP} type="number"/>
        <Button  onClick={VerifyOTP}>verify OTP</Button>
    </div>
  )
}

export default Roles
