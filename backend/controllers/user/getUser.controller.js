import { user } from "../../models/users.model.js";


export const getUser = async (req,res)=>{
    try{
            const {userId} = req.params;

            const myres = user.findOne({userId:userId});

            if(myres!==null){
                res.status(201).send(myres);
            }else{
                res.status(500).send('no user found');
            }

    }catch(error){
        res.status(500).send({msg:error});
    }
}