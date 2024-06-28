import mongoose,{Schema} from "mongoose";


const userSchema = new Schema({
    contactNo: {
        type: Number,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    emailId: {
        type: String,
        unique: true,
        trim: true
    },
    avatar: {
        type: String,
        default: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
    },
    role: {
        type: String,
        default: 'patient',
        enum: ['patient', 'admin','manager']
    },

})



export const user = mongoose.model("User",userSchema);














// const TestValueSchema = new Schema({
//     test_method: String,
//     test_parameter_id: Number,
//     parameter_name: String,
//     parameter_value: String,
//     is_highlighted: Boolean,
//     lower_bound: String,
//     display_value: String,
//     upper_bound: String,
//     impression: String,
//     unit: String,
//     other_male_id: String
//   }, { _id: false });  // _id is set to false to prevent creation of an ObjectId

//   const pointSchema = new Schema({
//     pointIcon:{type:String},
//     point:String,
//   },{_id:false})

//   const aboutSchema = new Schema({
//     description: String,
//     icon:String,
//     positive:[pointSchema],
//     negative:[pointSchema],
//   })