import express from "express";
import { createTest,getAllTest, updateTest,deleteTest } from "../controllers/test.controllers.js";

const router=express.Router();

router.route('/create-test').post(createTest);
router.route('/').get(getAllTest);
router.route('/update-test/:id').patch(updateTest)
router.route('/delete-test/:id').delete(deleteTest)


export default router;