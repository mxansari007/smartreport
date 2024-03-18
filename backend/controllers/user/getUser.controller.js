import { user } from "../../models/users.model.js";
import  jwt  from "jsonwebtoken";

export const getUser = async (req,res)=>{
    try{
            const token = req.cookies?.token;


            const data = jwt.verify(token,'maazansari007')

            const myres = await user.findOne({userId:data.userId});

            if(myres!==null){
                res.status(201).send(myres);
            }else{
                res.status(500).send('no user found');
            }

    }catch(error){
        res.status(500).send({msg:error});
    }
}