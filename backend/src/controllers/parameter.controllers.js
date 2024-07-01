import { Parameter } from '../models/parameter.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

//create parameter

const createParameter=asyncHandler(async(req,res)=>{
    const {name,method,impression,parameterValue,lowerBound,upperBound,is_highlighted,displayName,unit}=req.body;

    if(!name||!method||!impression||parameterValue===undefined||lowerBound===undefined||upperBound===undefined||is_highlighted===undefined){
        throw new ApiError(400,"All required fields must be provided");
    }

    const newParameter= await Parameter.create({
        name,
        method,
        impression,
        parameterValue,
        lowerBound,
        upperBound,
        is_highlighted,
        displayName,
        unit
    })
    return res.status(201).json(new ApiResponse(201,newParameter,"Parameter created successfully"))
})

export {createParameter};