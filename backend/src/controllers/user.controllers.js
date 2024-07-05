import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { LabAdmin } from "../models/labAdmin.model.js";
import { Patient } from "../models/patient.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { uploadOnCloud, deleteFromCloud } from "../utils/cloudinary.js";
import fs from "fs";
import jwt from "jsonwebtoken";



const options = {
    httpOnly: true,
    secure: true,
}
const generateTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, error || "Internal Server Error: While generating tokens");
    }
};

const registerUser = asyncHandler(async(req, _, next) => {
    try {
        const {phone, role} = req.body;
        if(!phone || !role){
            throw new ApiError(400, "Bad Request: Phone and role are required");
        }
    
        let existedUser = await User.findOne({phone});

        if(existedUser && existedUser.role !== role){
            throw new ApiError(400, "Bad Request: User already exists with different role");
        }
    
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
            if(role === "labAdmin"){
                const admin = await LabAdmin.create({
                    admin: existedUser._id,
                })
                if(!admin){
                    throw new ApiError(500, "Internal Server Error: While creating labAdmin");
                }
            }
            else if(role === "patient"){
                const patient = await Patient.create({
                    patient: existedUser._id,
                })

                if(!patient){
                    throw new ApiError(500, "Internal Server Error: While creating patient");
                }
            }
        }
    
        req.user = existedUser;
        next();
    } catch (error) {
        throw new ApiError(500, error || "Internal Server Error: While registering user");
    }

    
})

const loginUser = asyncHandler(async(req, res) => 
    {
        try {
        const {user} = req;
        if(!user){
            throw new ApiError(400, "Bad Request: While logging in user");
        }

        const {accessToken, refreshToken} = await generateTokens(user._id);

        const loggedInUser = await User.findById(user._id).select("-refreshToken");

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(
            200,
            {
                user: loggedInUser,
                role: user.role,
                accessToken,
                refreshToken,
            },
            "User logged in successfully"
            ));

        
        } catch (error) {
            throw new ApiError(500, error || "Internal Server Error: While logging in user");
        }
    }
)

const logoutUser = asyncHandler(async(req, res) => {
    try {
        const {user} = req;
        if( !user ){
            throw new ApiError(500, "Intern server error: While logging out user");
        };
    
        await User.findByIdAndUpdate(
            user._id,
            {
                $unset: {
                    refreshToken: 1,
                },
            },
            {
                new: true,
            }
        );

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(
                200,
                {},
                "User logged out successfully"
            ))

            
    } catch (error) {
        throw new ApiError(500, error || "Internal Server Error: catch: while logging out user");
    }

});

const updateUser = asyncHandler(async(req, res) => {
    try {
        const {user} = req;
        if(!user){
            throw new ApiError(400, "Bad Request: Unauthorized request");
        }
        const {name, email, phone} = req.body;
        const avatarPath = req.file?.path;
        if(
            
            [name, email, phone, avatarPath].every((value) => value == null || value.trim() === "")
        ){
            console.log("first");
            throw new ApiError(400, "Bad Request: At least one field is required");
        }

        if(phone){
            let er = false;
            if(phone === user.phone){
                if(avatarPath){
                    fs.unlinkSync(avatarPath);
                }
                throw new ApiError(400, "Bad Request: Already using this phone number");
            }
            const existed = await User.findOne({phone});
            if(existed){
                if(avatarPath){
                    fs.unlinkSync(avatarPath);
                }
                throw new ApiError(400, "Bad Request: phone number already exists");
            }
            
        }

        
        if(avatarPath){
            if(user.avatar !== "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"){
                await deleteFromCloud(user.avatar);
            }

            const uploadResult = await uploadOnCloud(avatarPath);
            if(!uploadResult){
                throw new ApiError(500, "Internal Server Error: While uploading avatar");
            }

            user.avatar = uploadResult.url;

        }

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                name: name || user.name || "",
                email: email || user.email || "",
                phone: phone || user.phone,
                avatar: user.avatar,
            },
            {
                new : true
            }
        ).select("-refreshToken");

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                {
                    user: updatedUser,
                },
                "User updated successfully"
            ));
        

    } catch (error) {
        throw new ApiError(500, error || "Internal server error: while updating user");
    }
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    try {
        const inputRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

        if(!inputRefreshToken){
            throw new ApiError(400, "Bad Request: Refresh token is expired");
        }

        const decodedToken = jwt.verify(inputRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken._id);

        if(!user){
            throw new ApiError(400, "Bad Request: User not found while refreshing access token");
        }

        if(user.refreshToken !== inputRefreshToken){
            throw new ApiError(400, "Bad Request: Refresh token is expired");
        }

        const {accessToken, refreshToken} = await generateTokens(user._id);

        const updatedUser = await User.findByIdAndUpdate(user._id,
            {
                refreshToken,
            },
            {
                new: true,
            }
        )

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(
                200,
                {
                    user: updatedUser,
                    accessToken,
                    refreshToken,
                },
                "Access token refreshed successfully"
            ))


    } catch (error) {
        new ApiError(500, error || "Internal Server Error: While refreshing access token");
    }
})

const getCurrentUser = asyncHandler(async(req, res) =>{
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                user: req.user,
            },
            "User retrieved Successfully"
        ))
})

const isUserExist = asyncHandler(async(req, res, next) => {
    const {phone} = req.body;
    if(!phone){
        throw new ApiError(400, "Bad Request: Phone number is required");
    }

    const user = await User.findOne({ phone });
    if(!user){
        throw new ApiError(404, "Not Found: User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                user,
            },
            "User retrieved successfully"
        ))
})



    export {
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
        refreshAccessToken,
        getCurrentUser,
        isUserExist,
    };