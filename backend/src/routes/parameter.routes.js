import express from "express";
import { createParameter } from "../controllers/parameter.controllers.js";

const router=express.Router();

router.route('/create-parameter').post(createParameter);


export default router;