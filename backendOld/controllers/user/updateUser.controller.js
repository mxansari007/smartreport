import { user } from "../../models/users.model.js";
import jwt from "jsonwebtoken";


export default async function updateUser(req,res){

    try{
        const {mobile,gender,age,customer_name} = req.body;

        const token = req.cookies?.token;

        const {userId} = jwt.verify(token,'maazansari007');
        
        const myres = await user.findOne({userId:userId});

    if(gender||age||customer_name||mobile){

        if(gender!==undefined){
            await user.updateOne({userId:userId},{gender:gender});
        }
        if(age!==undefined){
            await user.updateOne({userId:userId},{age:age});
        }
        if(customer_name!==undefined){
            await user.updateOne({userId:userId},{customer_name:customer_name});
        }
        if(mobile!==undefined){
            await user.updateOne({userId:userId},{mobile:mobile});
        }

        res.status(201).send(myres);
    }else{
        res.status(500).send('nothing to update');
    }

    }catch(err){
        res.send(err);
    }
}
