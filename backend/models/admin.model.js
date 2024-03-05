import mongoose,{Schema} from "mongoose"

const adminSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String
    }
})

export const admin = mongoose.model("Admin",adminSchema);


