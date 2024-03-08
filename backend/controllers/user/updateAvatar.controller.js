import {user} from '../../models/users.model.js';
import { uploadOnCloudinary } from '../../utils/cloudinary.js';

export async function updateAvatar(req,res){
    try{
        
        // Check if the avatar file exists in the request body
        console.log(req.file);
        if (!req.file) {
            return res.status(400).send({ error: "File not uploaded" });
        }

        const avatarFilePath = req.file.path;
        const {mobile} = req.body
        const myuser =  await user.findOne({mobile:mobile});
        console.log(myuser.avatar);
        if(!myuser.avatar){
            const response = await uploadOnCloudinary(avatarFilePath);
            await user.updateOne({mobile:mobile},{avatar:response.secure_url,avatarId:response.public_id });
        }else if(myuser.avatar){
            const response = await uploadOnCloudinary(avatarFilePath,myuser.avatarId);
            await user.updateOne({mobile:mobile},{avatar:response.secure_url })
        }

        res.send({ link: response.secure_url });

    }catch(err){
        res.send(err);
    }
}