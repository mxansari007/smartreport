import { user } from "../../models/users.model.js";



export const createUser = async (req,res)=>{
    try{
        const newUser = new user({});
        await newUser.save();
        res.send('user created');

    }catch(err){
        res.send(err.message);
    }
}



