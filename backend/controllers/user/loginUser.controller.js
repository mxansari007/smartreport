import { user } from "../../models/users.model.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config({
    path:'./.env'
})

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
                maxAge: 60 * 60 * 1000, // 1 hour
                secure: true, // Set to true if using HTTPS
                sameSite: 'strict', // Adjust as needed
                path: '/'
            });
    

        }


        res.status(200).send(myres);


    }catch(err){
     res.send(err.message);   
    }
}


export const logoutUser = async (req,res)=>{


    try{

        const token = req.cookies?.token;

        res.clearCookie('token', { domain: process.env.FRONTEND_URL, path: '/', expires: new Date(0) });
        res.send('logged out')

    }catch(error){

        res.status(500).send(error);
    }

}