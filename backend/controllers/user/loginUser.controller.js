import { user } from "../../models/users.model.js";
import jwt from "jsonwebtoken";

export default async function loginUser(req,res){
    try{
        const {userId} = req.body;
        const myres=await user.findOne({userId:userId});
        if(myres===null){
            res.send('no user');
        }
    else{

            const token = jwt.sign({ userId: userId }, 'maazansari007', {
                expiresIn: '1h',
                });
            
            // Set the token in an HTTP-only cookie
    res.cookie('token', token, {
                httpOnly: true,
                // secure: true, // Uncomment this line if you're using HTTPS
                maxAge: 60 * 60 * 1000 // 1 hour
            });
    

        }


        res.status(200).send({msg:'login successful'});


    }catch(err){
     res.send(err.message);   
    }
}