import { LabAdmin } from "../../models/labAdmin/labAdmin.model.js";
import { User } from "../../models/user/user.model.js";


const createLabAdmin = async (req, res) => {
    try {
        const {contactNo, firstName, lastName, emailId, avatar, role, labId, specialization} = req.body;

        if(!contactNo || !firstName){
            return res.status(400).json({message: "Please fill the required fields"});
        }

        const userExists = await User.findOne({contactNo});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }

        const user = await User.create({
        contactNo,
        firstName,
        lastName,
        emailId,
        avatar,
        role
        });

        if(!user){
            return res.status(400).json({message: "User creation failed while creating Lab Admin"});
        }

        const labAdmin = await LabAdmin.create({
            admin: user._id,
            laboratory: labId,
            specialization
        });

        if(!labAdmin){
            return res.status(400).json({message: "Lab admin creation failes"});
        }

        return res.status(200).json({message: "Lab admin created successfully"});
    
    } catch (error) {
        return res.status(500).send('Lab Admin creation failed');
    }
}

export {createLabAdmin};