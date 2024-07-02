import express from "express";
import {createParameter,getAllParameters,updateParameter,deleteParameter}from "../controllers/parameter.controllers.js";

const router=express.Router();

router.route('/create-parameter').post(createParameter);
router.route('/').get(getAllParameters);
router.route('/update-parameter/:id').patch(updateParameter);
router.route('/delete-parameter/:id').delete(deleteParameter);


export default router;