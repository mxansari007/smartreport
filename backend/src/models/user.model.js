import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            
        }
    }, {timestamps: true});

export const User = new mongoose.model("User", userSchema);