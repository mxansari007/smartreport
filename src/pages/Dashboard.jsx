import React, { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, Card, CardFooter } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import axios from 'axios';
import Navbar from "../components/Navbar";
import female from '../assets/profile.jpg';
import male from '../assets/man.png';
import { useNavigate } from "react-router-dom";
import {Input} from '../components/ui/input';
import LoadingPage from "../components/LoadingPage";

function Dashboard() {

  const initial = {};

  const [userDetails,setUserDetails] = useState(JSON.parse(localStorage.getItem('user')));
  const Navigator = useNavigate();
  const [edit,setEdit] = useState(false);
  const [editChange,setEditChanges] = useState(initial);
  const [save,setSave] = useState(false);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    ;(async ()=>{

      try{
        const res = await axios({
          url:import.meta.env.VITE_BASE_URL + '/user/getUser',
          method:'GET',
          withCredentials:true
        })

        setUserDetails(res.data);
      }catch(error){
        console.log(error);
      }

    })()
  },[])

  useEffect(()=>{
    console.log(editChange);
  },[editChange])


  const handleEdit = (e)=>{
    setSave(true);
    console.log(e.target.name);
    setEditChanges(prev=>{return {...prev,[e.target.name]:e.target.value}})

  }

  const handleSave =()=>{
    setLoading(true);
    ;(async ()=>{
      try{
        const res = await axios({
          url:import.meta.env.VITE_BASE_URL + '/user/updateUser',
          method:'POST',
          withCredentials:true,
          data:editChange
        })

        localStorage.setItem('user',JSON.stringify(res.data));
        setUserDetails(res.data);
        setLoading(false);
        setEdit(false);
        setSave(false);
        setEditChanges({});

      }catch(error){
        setLoading(false);
        console.log(error);
      }
    })()
  }




  return (
    <>
    <Navbar />
      <div className="bg-[#0077ff] min-h-screen p-8 text-white">
        <h1 className="text-4xl font-bold">{`Hi, ${userDetails?userDetails.customer_name?userDetails.customer_name:'Guest':'Guest'} 👋`}</h1>
        <div className="mt-8 grid grid-cols-2 gap-8">
          <div className="">
            <h2 className="text-2xl font-semibold mb-4 text-[#F59E0B]">
              Previous Reports
            </h2>
            <Card className="bg-white text-gray-800 h-96">
              <CardContent className="p-6">
                <p onClick={()=>{Navigator('/report')}} className="text-center cursor-pointer">{`${userDetails?userDetails.test_name?userDetails.test_name:'There are no reports pending' :'There are no reports pending'}`}</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#F59E0B]">
              Profile
            </h2>
            <Card className="bg-white text-gray-800 ">
              <CardContent className="p-6 flex flex-col">
                <div className="mr-4 flex items-center p-2 ">
                  <img
                    className="w-20 h-20 rounded-full outline outline-double outline-blue-600 outline-2"
                    src={userDetails.avatar===undefined?userDetails.gender!==undefined?userDetails.gender==="M"?male:female:male:userDetails.avatar}
                    alt=""
                  />
                  {edit?<Input name="customer_name" onChange={handleEdit} defaultValue={`${userDetails?userDetails.customer_name?userDetails.customer_name:'Guest':'Guest'}`} className="ml-4" type="text"/>:<p className="text-blue-600 font-bold ml-4 text-lg">{`${userDetails?userDetails.customer_name?userDetails.customer_name:'Guest':'Guest'}`}</p>}
                </div>
                <div className="text-left  outline outline-gray-300 rounded-lg p-3.5 w-full bg-slate-100">
                  <label htmlFor="" className="text-yellow-500 font-semibold ">Contact</label>
                  {edit?<Input onChange={handleEdit} name="mobile" type="number" defaultValue={`${userDetails.mobile!==undefined?userDetails.mobile:'Not Set'}`}/>:<p className=""> +91 {userDetails.mobile!==undefined?userDetails.mobile:'Not Set'}</p>}
                  <label htmlFor="" className="text-yellow-500 font-semibold">Gender</label>
                  {edit?<Input onChange={handleEdit} name="gender" type="text" defaultValue={`${userDetails.gender!==undefined?userDetails.gender:'Not Set'}`} />:<p>{userDetails.gender!==undefined?userDetails.gender:'Not Set'}</p>}
                  <label htmlFor="" className="text-yellow-500 font-semibold">Age</label>
                  {edit?<Input onChange={handleEdit} name="age" type="text" defaultValue={`${userDetails.age!==undefined?userDetails.age:'Not Set'}`} />:<p>{userDetails.age!==undefined?userDetails.age:'Not Set'}</p>}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 justify-center p-6">
                {!save?<Button onClick={()=>{setEdit(true)}} className="w-full bg-white outline outline-[#F59E0B] outline-1 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white">
                  Edit Profile
                </Button>:null}
                {save?<Button onClick={()=>{handleSave()}} className="w-full bg-white outline outline-green-600 outline-1 text-white bg-green-600 hover:bg-green-500 hover:text-white">
                  Save
                </Button>:null}
                {edit?<Button onClick={()=>{setEdit(false);setEditChanges(initial);setSave(false)}} className="w-full bg-white outline outline-red-600 outline-1 text-white bg-red-600 hover:bg-red-500 hover:text-white">
                  Cancel
                </Button>:null}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      {loading?<LoadingPage />:null}
    </>
  );
}

export default Dashboard;
