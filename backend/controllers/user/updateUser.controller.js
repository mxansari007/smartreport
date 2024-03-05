import { user } from "../../models/users.model.js";
import { Test } from "../../models/tests.model.js";

export default async function updateUser(req,res){

    try{
        const {mobile,avatar,gender,test,age,firstName,lastName} = req.body;

    if(avatar||gender||test||age||firstName||lastName){

        if(gender){
            await user.updateOne({mobile:mobile},{gender:gender});
        }
        if(age){
            await user.updateOne({mobile:mobile},{age:age});
        }
        if(firstName){
            await user.updateOne({mobile:mobile},{firstName:firstName});
        }
        if(lastName){
            await user.updateOne({mobile:mobile},{lastName:lastName});
        }
        if(test){
            const myres = await Test.findOne({name:test});
            if(myres){
                await user.updateOne({mobile:mobile},{$push: {test: myres}})
            }else{
                res.send('invalid test');
            }
        }
        if(avatar){
            
        }

        res.send('updated successfully');
    }else{
        res.send('nothing to update');
    }

    }catch(err){
        res.send(err);
    }
}
