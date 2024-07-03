import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Laboratory } from "../models/laboratory.model.js";

//create lab
const createLab = asyncHandler(async (req, res) => {
  const { name, admin, address, city, operatingHours, contact, email, tests } =
    req.body;

  if (!name || !address || !city || !operatingHours || !contact || !email) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingLab = await Laboratory.findOne({ name });
  if (existingLab) {
    throw new ApiError(400, "Lab with this name already exists.");
  }

  const newLab = await Laboratory.create({
    name,
    admin,
    address,
    city,
    operatingHours,
    contact,
    email,
    tests,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, newLab, "lab created successfully"));
});

// Get Laboratory by name
const getLaboratory = asyncHandler(async (req, res) => {
  const { name } = req.params; // Get 'name' from query parameters

  if (!name) {
    throw new ApiError(400, "Please provide the laboratory name.");
  }
  const lab = await Laboratory.findOne({ name }).populate("admin tests");

  if (!lab) {
    throw new ApiError(404, "Laboratory not found.");
  }

  return res.status(200).json(new ApiResponse(200, lab, ""));
});

//Get all laboratories
const getAllLaboratories = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, name, city, contact, email } = req.query;

  // Convert page and limit to numbers
  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  const filter = {};
  if (name) filter.name = new RegExp(name, "i"); // Case-insensitive partial match for name
  if (city) filter.city = new RegExp(city, "i"); // Case-insensitive partial match for city
  if (contact) filter.contact = new RegExp(contact, "i"); // Case-insensitive partial match for contact
  if (email) filter.email = new RegExp(email, "i"); // Case-insensitive partial match for email

  // Fetch the laboratories with filtering, pagination, and sorting
  const labs = await Laboratory.find(filter)
    .populate("admin tests")
    .skip((pageNumber - 1) * pageSize) // Calculate skip value
    .limit(pageSize) // Limit results per page
    .sort({ createdAt: -1 }); // Sort by creation date in descending order

  const totalLabs = await Laboratory.countDocuments(filter); // total labs
  const totalPages = Math.ceil(totalLabs / pageSize); //total pages

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { labs, totalLabs, totalPages, currentPage: pageNumber },
        ""
      )
    );
});

//update laboratory
const updateLaboratory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, address, city, operatingHours, contact, email, tests } =
    req.body;

  if (!name || !address || !city || !operatingHours || !contact || !email) {
    throw new ApiError(400, "All fields are required.");
  }

  // Check for duplicates
  const existingLabByName = await Laboratory.findOne({
    name,
    _id: { $ne: id },
  });
  if (existingLabByName) {
    throw new ApiError(400, "A laboratory with this name already exists.");
  }

  const existingLabByContact = await Laboratory.findOne({
    contact,
    _id: { $ne: id },
  });
  if (existingLabByContact) {
    throw new ApiError(400, "A laboratory with this contact already exists.");
  }

  const existingLabByEmail = await Laboratory.findOne({
    email,
    _id: { $ne: id },
  });
  if (existingLabByEmail) {
    throw new ApiError(400, "A laboratory with this email already exists.");
  }

  const lab = await Laboratory.findByIdAndUpdate(
    id,
    { name, address, city, operatingHours, contact, email, tests },
    { new: true, runValidators: true }
  ).populate("admin tests");

  if (!lab) {
    throw new ApiError(404, "Laboratory not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, lab, "Laboratory updated successfully."));
});

//delete laboratory
const deleteLaboratoryByName = asyncHandler(async (req, res) => {
    const { name } = req.params;

    const lab = await Laboratory.findOneAndDelete({ name });

    if (!lab) {
        throw new ApiError(404, 'Laboratory not found.');
    }

    return res
        .status(200)
        .json(new ApiResponse(200, lab, 'Laboratory deleted successfully.'));
});

export { createLab,
     getLaboratory, getAllLaboratories, updateLaboratory,deleteLaboratoryByName};
