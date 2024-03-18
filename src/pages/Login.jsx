import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useNavigate } from "react-router";
import bgImage from '../assets/img.png';
function Login() {

  const [userId,setUserId] = useState('');
  const Navigator = useNavigate();

  useEffect(()=>{
    console.log(userId);
  },[userId])



  const handleUser = (e)=>{
      setUserId(e.target.value);
  }

  const handleLogin = ()=>{
    console.log('clicked')
      ;(async ()=>{
        try{
         const res = await axios({
          url:import.meta.env.VITE_BASE_URL + '/user/loginUser',
          method:"POST",
          data:{userId:userId},
          withCredentials:true
         })

         console.log(res.data);
         localStorage.setItem('user',JSON.stringify(res.data));
         Navigator('/dashboard');

        }catch(err){
          console.log(err);
        }
      })()
  }


  return (
    <>
      <div className="min-h-screen bg-[#60A5FA] flex">
        <div className="">
          <img className="h-screen bg-cover bg-origin-content bg-no-repeat" src={bgImage} alt='bgImage' />
        </div>
        <div className="flex-1 flex flex-col justify-center items-start bg-[#1E40AF] text-white p-12 ">
          <h1 className="text-4xl font-bold mx-8 mb-8">Welcome To <br/>SMART REPORT</h1>
          <Label htmlFor="user-id" className="text-[#F59E0B] font-bold mx-8 mb-3">Enter your User ID</Label>
          <Input onChange={handleUser} className="w-3/6 text-sm bg-white mx-8 mb-3 text-black" placeholder="User ID" type="text" />
          <Button onClick={handleLogin} className="w-3/6 bg-[#F59E0B] text-white text-sm mx-8">Login</Button>
        </div>
      </div>
    </>
  );
}

export default Login;
