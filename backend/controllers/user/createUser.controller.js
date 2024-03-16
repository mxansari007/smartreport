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


export const createAbout = async (req,res)=>{
    try{

        const {test_id,about} = req.body;

        await user.updateMany({test_id:test_id},{about:about});

        res.status(200).send('about updated successfully');

    }catch(error){

        res.status(500).send('update unsuccessful');
    }
}



