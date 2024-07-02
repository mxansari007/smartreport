import mongoose, {Schema} from "mongoose";
import { type } from "os";

const testSchema=new Schema(
    {
        name:{
            type:String,
            unique:true,
        },
        parameters:{
            type:Schema.Types.ObjectId,
            ref:"Parameter",
            required:true
        }
    },
    {
        timestamps:true
    }
)

export const Test=mongoose.model("Test",testSchema)