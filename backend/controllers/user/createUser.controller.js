import { user } from "../../models/users.model.js";


export default async function createUser(req,res){
    try{
        const {mobile} = req.body;
        const myres=await user.findOne({ mobile: mobile });
        if(myres===null){
            const newUser = user({
                mobile:mobile
            })

            await newUser.save();
            res.send('saved succefully')
        }else{
            res.send('find one')
        }
        

    }catch(err){
     res.send('some error');   
    }
}