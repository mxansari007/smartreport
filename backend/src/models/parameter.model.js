import mongoose, {Schema} from "mongoose";

const parameterSchema= new Schema(
    {
      name:{
       type:String,
       required:true
      },
      method:{
        type:String,
        required:true
      },
      impression:{
        type:String,
        required:true
      },
      parameterValue:{
        type:Number,
        required:true
      },
      lowerBound:{
        type:Number,
        required:true
      },
      upperBound:{
        type:Number,
        required:true
      },
      is_highlighted:{
        type:Boolean,
        required:true
      },
      displayName:{
        type:String
      },
      unit:{
        type:String
      }

    },
    {
      timestamps:true
    }
)

export const Parameter=mongoose.model("Parameter",parameterSchema)