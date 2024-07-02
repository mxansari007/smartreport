import mongoose, {Schema} from "mongoose";
import { Test } from './test.model.js';

const laboratorySchema= new Schema(
    {
     name:{
        type:String,
        required:true,
        unique:true
     },
     admin:{
        type:Schema.Types.ObjectId,
        ref:"User"
     },
     address:{
        type:String,
        required:true,    
     },
     city:{
        type:String,
        required:true
     },
     operatingHours:{
        type:String,
        required:true
     },
     contact:{
        type:String,
        required:true ,
        unique:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     tests:[
        {
            type:Schema.Types.ObjectId,
            ref: "Test"
        }
     ]
    },
    {
        timestamps:true
    }
)

export const Laboratory=mongoose.model("Laboratory",laboratorySchema)