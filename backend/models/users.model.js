import mongoose,{Schema} from "mongoose";



const TestValueSchema = new Schema({
    test_method: String,
    test_parameter_id: Number,
    parameter_name: String,
    parameter_value: String,
    is_highlighted: Boolean,
    lower_bound: String,
    display_value: String,
    upper_bound: String,
    impression: String,
    unit: String,
    other_male_id: String
  }, { _id: false });  // _id is set to false to prevent creation of an ObjectId


const userSchema = new Schema({
    userId:{
        type:Number,
        unique:true,
    },
    tempId:{
        type:String,
    },
    booking_id:{
        type:Number
    },
    customer_name:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    avatar:{
        type:String,
    },
    avatarId:{
        type:String,
    },
    mobile:{
        type:String,
    },
    collection_date:{
        type: Date,
        default: Date.now
    },
    booking_date:{
        type: Date,
        default: Date.now
    },
    test_id:{
        type:Number
    },
    test_code:{
        type:String,
    },
    test_name:{
        type:String,
    },
    test_values: [TestValueSchema],
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }

})



export const user = mongoose.model("User",userSchema);