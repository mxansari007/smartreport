import { Router } from "express";
import {upload} from '../middleware/multer.middleware.js';
const router = Router();

import { createManager,deleteManager,verifyManager } from "../controllers/manager/index.js";
import {createTest,getTest,deleteTest,createParameter,getParameter} from "../controllers/manager/Test.js";
import { createLabAdmin } from "../controllers/labAdmin/labAdmin.controller.js";


router.post("/create",createManager);
router.delete("/delete/:contactNo",deleteManager);
router.get("/verify/:contactNo",verifyManager);
router.post("/login",loginManager);


router.post("/test/create",createTest);
router.get("/test/get",getTest);
router.delete("/test/delete/:testName",deleteTest);
router.post("/parameter/create",createParameter);
router.get("/parameter/get/:param",getParameter);
router.delete("/parameter/delete/:param",deleteParameter);

router.post("/createLabAdmin", createLabAdmin);

router.post("/createLabAdmin", createLabAdmin);




export default router;