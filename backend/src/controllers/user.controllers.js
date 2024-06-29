import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { uploadOnCloud, deleteFromCloud } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { loginUser } from "../../../../VideoTweet/src/controllers/user.controller.js";

const generateTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "Internal Server Error: While generating tokens");
    }
};

const registerUser = asyncHandler(async(req, res) => {
    const {phone, role} = req.body;
    if(!phone || !role){
        throw new ApiError(400, "Bad Request: Phone and role are required");
    }

    const existedUser = await User.findOne({ $and: [{phone}, {role}]});

    if(!existedUser){
        const user = await User.create(
            {
                phone,
                role,
            }
        );
        existedUser = await User.findById(user._id);
        if(!existedUser){
            throw new ApiError(500, "Internal Server Error: While creating user");
        }
    }

    return loginUser(existedUser);
})

const loginUser = async(user) => 
    {
        
       try {
         if(!user){
             throw new ApiError(400, "Bad Request: While logging in user");
         }
 
         const {accessToken, refreshToken} = await generateTokens(user._id);

         
       } catch (error) {
              throw new ApiError(500, "Internal Server Error: While logging in user");
       }
    };