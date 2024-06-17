import mongoose,{Schema} from "mongoose"
import { user } from "../users.model.js";


const Admin = user.discriminator('Admin', new mongoose.Schema({
    patients
}));





export const admin = mongoose.model("Admin",adminSchema);


