import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Login() {
  return (
    <>
      <div className="min-h-screen bg-[#60A5FA] flex">
        <div className="w-2/5 flex-1 bg-[url('src/assets/img.png?height=683&width=475')] bg-cover bg-origin-content bg-no-repeat">
        </div>
        <div className="w-3/5 flex flex-col justify-center items-start bg-[#1E40AF] text-white p-12 ">
          <h1 className="text-4xl font-bold mx-8 mb-8">Welcome To <br/>SMART REPORT</h1>
          <Label htmlFor="user-id" className="text-[#F59E0B] font-bold mx-8 mb-3">Enter your User ID</Label>
          <Input className="w-3/6 text-sm bg-white mx-8 mb-3 text-black" placeholder="User ID" type="text" />
          <Button className="w-3/6 bg-[#F59E0B] text-white text-sm mx-8">Login</Button>
        </div>
      </div>
    </>
  );
}

export default Login;
