import axios from "axios";
import React,{useEffect, useState} from "react";
import { IoMdCart } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const midbar = ["DASHBOARD", "REPORT", "ADVICE", "OUR TEST"];
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
      Navigator('/Dashboard');
    }
  }

  const handleLogout = ()=>{
    ;(async ()=>{
      try{
        const res = await axios({
          url:import.meta.env.VITE_BASE_URL + '/user/logout',
          method:'GET',
          withCredentials:true
        })

        Navigator('/');
      }catch(error){
        console.log(error);
      }
    })()
  }


  return (
    <nav className="flex justify-around bg-[#0077ff] p-4 shadow-cyan-100 z-[999] ">
      <p className="bg-white rounded-full font-bold text-xs text-[#1E40AF] p-2 px-5  hover:cursor-pointer">SMART REPORT</p>
      <div className="flex justify-around gap-20">
        {midbar.map((miditem, index) => (
          <li
            onClick={()=>handleNavigation(miditem)}
            key={index}
            className="bg-white text-xs font-bold text-yellow-500 rounded-full border border-yellow-500 p-2 list-none px-8 hover:bg-yellow-500 hover:text-white hover:cursor-pointer"
          >
            {miditem}
          </li>
        ))}
      </div>

      <div className="flex justify-around gap-4 text-white relative">
        <IoMdCart size={30} className="hover:cursor-pointer" />
        <TiThMenu onClick={(e)=>{e.stopPropagation();setSubMenu(prev=>!prev)}} size={30} className="hover:cursor-pointer" />
          {subMenu===true?<div className="absolute w-[200px] h-[80px] bg-white rounded-md top-8 right-2 flex py-4">
            <p onClick={handleLogout} className="text-black hover:bg-gray-300 w-full text-center cursor-pointer">Logout</p>
          </div>:<></>}
      </div>
    </nav>
  );
}

export default NavBar;