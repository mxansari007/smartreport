import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Roles = () => {

 const [userId, setUserId] = useState();
 const Navigator = useNavigate();

const handleUser = (e)=>{
  setUserId(e.target.value);
}

const handleLogin = ()=>{
  ;(async ()=>{
    try{
      const myres = await axios({
        'url':'/api/user/loginUser',
        'method':'post',
        'data':{userId:userId}
      })
      console.log(myres);
      Navigator('/Report');
    }catch(err){
      console.log(err);
    }

  })()
}

  return (
    <div>
        <Input onChange={handleUser} type="number"/>
        <Button onClick={handleLogin}>Login</Button>
    </div>
  )
}

export default Roles
