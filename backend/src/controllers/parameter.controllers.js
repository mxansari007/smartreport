import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Parameter } from '../models/parameter.model.js';

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

const getAllParameters = asyncHandler(async (req, res) => {
    const { method, is_highlighted, sortBy, order = 'asc', page = 1, limit = 10 } = req.query;

    // Build query object
    const query = {};
    if (method) query.method = method;
    if (is_highlighted !== undefined) query.is_highlighted = is_highlighted === 'true';

    // Set sorting
    const sortOptions = {};
    if (sortBy) sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    // Fetch parameters with pagination
    const parameters = await Parameter.find(query)
                                     .sort(sortOptions)
                                     .skip((page - 1) * limit)
                                     .limit(parseInt(limit));

    const totalParameters = await Parameter.countDocuments(query);

    return res.status(200).json(new ApiResponse(200, {
        total: totalParameters,
        page,
        limit,
        parameters
    }, "Parameters retrieved successfully"));
});


const updateParameter = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        name,
        method,
        impression,
        parameterValue,
        lowerBound,
        upperBound,
        is_highlighted,
        displayName,
        unit
    } = req.body;

   
    if (!id) {
        throw new ApiError(400, "Parameter ID is required");
    }

    // Find the parameter by ID
    const parameter = await Parameter.findById(id);

    if (!parameter) {
        throw new ApiError(404, "Parameter not found");
    }

    // Update only the fields provided in the request body
    if (name !== undefined) parameter.name = name;
    if (method !== undefined) parameter.method = method;
    if (impression !== undefined) parameter.impression = impression;
    if (parameterValue !== undefined) {
        if (parameterValue < lowerBound || parameterValue > upperBound) {
            throw new ApiError(400, "Parameter Value must be within the specified bounds");
        }
        parameter.parameterValue = parameterValue;
    }
    if (lowerBound !== undefined) parameter.lowerBound = lowerBound;
    if (upperBound !== undefined) parameter.upperBound = upperBound;
    if (is_highlighted !== undefined) parameter.is_highlighted = is_highlighted;
    if (displayName !== undefined) parameter.displayName = displayName;
    if (unit !== undefined) parameter.unit = unit;

    // Save the updated parameter
    await parameter.save();

    // Send the updated parameter in the response
    return res.status(200).json(new ApiResponse(200, parameter, "Parameter updated successfully"));
});


const deleteParameter=asyncHandler(async(req,res)=>{

    const {id}=req.params;

    const parameter=await Parameter.findByIdAndDelete(id);

    if(!parameter){
        throw new ApiError(404,"Parameter doesn't exist")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,parameter,'Parameter deleted successfully'))
})

export {createParameter,getAllParameters,updateParameter,deleteParameter};