import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        name: {
            type: String,
            lowercase: true,
            trim: true,
            index: true,
            default: "",
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            default: "",
        },
        phone: {
            type: String,
            unique: true,
            required: true,
        },
        avatar: {
            type: String,
            default: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
        },
        role: {
            type: String,
            enum: ["manager","labAdmin", "patient"],
            required: true,
        },
        refreshToken:{
            type: String,
        }

    }, {timestamps: true});

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
        _id: this.id,
        phone: this.phone,
        role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
)
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        }
    )
}

export const User = new mongoose.model("User", userSchema);
