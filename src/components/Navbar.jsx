import React from "react";
import { IoMdCart } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
function NavBar() {
  const midbar = ["DASHBOARD", "REPORT", "ADVICE", "OUR TEST"];
  return (
    <nav className="flex justify-around bg-[#1E40AF] p-4 gap-60 shadow-cyan-100 z-[999] ">
      <li className="bg-white rounded-full list-none font-bold text-xs text-[#1E40AF] p-2 px-5  hover:cursor-pointer">
        SMART <span className="text-yellow-500">REPORT</span>
      </li>
      <div className="flex justify-around gap-20">
        {midbar.map((miditem, index) => (
          <li
            key={index}
            className="bg-white text-xs font-bold text-yellow-500 rounded-full border border-yellow-500 p-2 list-none px-8 hover:bg-yellow-500 hover:text-white hover:cursor-pointer"
          >
            {miditem}
          </li>
        ))}
      </div>

      <div className="flex justify-around gap-4 text-white">
        <IoMdCart size={30} className="hover:cursor-pointer" />
        <TiThMenu size={30} className="hover:cursor-pointer" />
      </div>
    </nav>
  );
}

export default NavBar;