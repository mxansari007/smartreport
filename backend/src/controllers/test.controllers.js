import { Test } from "../models/test.model.js";
import { Parameter } from '../models/parameter.model.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTest = asyncHandler(async (req, res) => {
  const { name, parameters,price } = req.body;
  if (
    !name ||
    !parameters ||
    !Array.isArray(parameters) ||
    parameters.length === 0
  ) {
    throw new ApiError(
      400,
      "Name and parameters must be provided, and parameters must be a non-empty array"
    );
  }

  if(price===undefined){
    throw new ApiError(400,"Price must be provided")
  }


  // Check if all provided parameters exist
  const para_list = parameters.map(param => param.id);
  console.log(para_list);
  const existingParameters = await Parameter.find({ _id: { $in: para_list } });
  const existingParameterIds = existingParameters.map(param => param._id.toString());
  console.log(existingParameterIds);
  const nonExistingParameters = para_list.filter(param => !existingParameterIds.includes(param));

  if (nonExistingParameters.length > 0) {
    throw new ApiError(400, `The following parameters do not exist: ${nonExistingParameters.join(', ')}`);
  }

  const newTest = await Test.create({
    name:name,
    parameters:para_list,
    price:price,
  });

  const populatedTest = await Test.findById(newTest._id).populate('parameters').exec();

  return res
    .status(201)
    .json(new ApiResponse(201, populatedTest, "Test created successfully"));
});

const getAllTest = asyncHandler(async (req, res) => {

  const tests = await Test.aggregate([
    { $lookup: {
        from: 'parameters',  // The collection name for Parameter model
        localField: 'parameters',  // Field in Test document
        foreignField: '_id',  // Field in Parameter documents
        as: 'parameters',  // Name for the populated field
      }
    },
    { $unwind: '$parameters' },  // Flatten the parameters array
    { $group: {
        _id: '$_id',  
        name: { $first: '$name' },
        parameters: { $push: '$parameters' },
        price: { $first: '$price' },
        status: { $first: '$status' },
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' }
      }
    },
    { $sort: { createdAt: -1 } }  // Optional: Sort by creation date, descending
  ]).exec();

  if (!tests || tests.length === 0) {
    throw new ApiError(404, "No tests found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tests, "Tests retrieved successfully"));
});

const updateTest=asyncHandler(async(req,res)=>{
const {id}=req.params;
const {
  name,
  parameters,
  price,
  status
}=req.body;

if(!id){
  throw new ApiError(400,"Test id is required");
}

const test=await Test.findById(id);

if(!test){
  throw new ApiError(404,"Test not found")
}


//update the fields that are provided in the request body
if(name!==undefined)test.name=name;

if(parameters!==undefined) test.parameters=parameters;

if(price!==undefined) test.price=price;
if(status!==undefined) test.status=status;

// save the updated test 
await test.save()

// Populate the parameters field
const updatedTest = await Test.findById(id).populate('parameters');
return res.status(200).json(new ApiResponse(200,updatedTest,"Test updated successfully"))

})

const deleteTest=asyncHandler(async(req,res)=>{
  const {id}=req.params;

  const test=await Test.findByIdAndDelete(id);

  if(!test){
      throw new ApiError(404,"Test doesn't exist")
  }

  return res
  .status(200)
  .json(new ApiResponse(200,test,'Test deleted successfully'))
})
export { createTest,getAllTest,updateTest,deleteTest };