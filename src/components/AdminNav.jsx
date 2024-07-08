import axios from "axios";
import React,{useEffect, useState} from "react";
import { IoMdCart } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../@/components/ui/avatar"


function AdminNav() {
  const midbar = ["DASHBOARD"];
  const [subMenu,setSubMenu] = useState(false);

  const Navigator = useNavigate();

  useEffect(()=>{


    function fun(){
      setSubMenu(false);
    }

    window.addEventListener("click",fun);

    return ()=>{
      window.removeEventListener("click",fun)
    }

  })

  const handleNavigation = (page)=>{
    if(page==="REPORT"){
    Navigator('/report');
    }else if(page==="DASHBOARD"){
      Navigator('/labadmin/dashboard');
    }
  }


  return (
    <nav className="flex justify-between p-4 z-[999] bg-[#0A5BA5]">
    <div className="flex justify-center items-center gap-4">
      <h1 className="bg-gray-100 rounded-full font-bold text-sm text-[#1E40AF] p-2 px-5  hover:cursor-pointer">SMART REPORT</h1>
      <div className="flex justify-center items-center gap-20">
        {midbar.map((miditem, index) => (
          <li
            onClick={()=>handleNavigation(miditem)}
            key={index}
            className="bg-white flex justify-center items-center text-xs font-bold text-yellow-500 rounded-full border border-yellow-500 p-2 list-none px-8 hover:bg-yellow-500 hover:text-white hover:cursor-pointer"
          >
            {miditem}
          </li>
        ))}
      </div>
      </div>

      <div className="flex justify-around gap-4 text-white relative px-8">
      <Avatar>
      <DropdownMenu>
      <DropdownMenuTrigger>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>{
            Navigator('/manager')
        }}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </Avatar>
      </div>
    </nav>
  );
}

export default AdminNav;