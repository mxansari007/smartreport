import mongoose, {Schema} from "mongoose";
import { Parameter } from "./parameter.model.js";

const testSchema=new Schema(
    {
        name:{
            type:String,
            unique:true,
            required:true
        },
        parameters:[{
            type:Schema.Types.ObjectId,
            ref:"Parameter",
            required:true
        }],
        price:{
            type:Number,
            required:true,
            default:0
        },
        status:{
            type:String,
            enum:["booked","sample taken","result released" ]
        }
    },
    {
        timestamps:true
    }
)

export const Test=mongoose.model("Test",testSchema)