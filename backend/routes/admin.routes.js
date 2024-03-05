import { Router } from "express";


const router = Router();
import createTest from "../controllers/admin/createTest.controller.js";


router.post('/createTest',createTest);


export default router;