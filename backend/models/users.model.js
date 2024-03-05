import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    mobile:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    avatar:{
        type:String,
    },
    avatarId:{
        type:String,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String
    },
    test: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }],
    results: [{
        testName:String,
        parameters: {},
      }],
    status: {
        type: String,
        enum: ['requested', 'completed','no test'],
        default: 'no test'
      }
})

export const user = mongoose.model("User",userSchema);