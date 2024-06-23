import { user } from "../../models/users.model.js";
import { destroyOnCloudinary } from "../../utils/cloudinary.js";

export async function removeAvatar(req,res){
    try{

        const {mobile} = req.body;

        const temp = await user.findOne({mobile:mobile});
        await user.updateOne({mobile:mobile},{$unset:{avatar:1,avatarId:1}});

        const response = await destroyOnCloudinary(temp.avatarId);

        res.send(response);

        

    }catch(err){
        res.send(err);
    }
}