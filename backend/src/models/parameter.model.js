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
      },
      parameterValue:{
        type:Number,
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
      },
      displayName:{
        type:String
      },
      unit:{
        type:String,
        required:true
      }

    },
    {
      timestamps:true
    }
)

export const Parameter=mongoose.model("Parameter",parameterSchema)