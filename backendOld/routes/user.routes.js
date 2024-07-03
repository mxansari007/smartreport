import { Router } from "express";
import {upload} from '../middleware/multer.middleware.js';
const router = Router();

import loginUser from "../controllers/user/loginUser.controller.js";
import updateUser from "../controllers/user/updateUser.controller.js";
import { updateAvatar } from "../controllers/user/updateAvatar.controller.js";
import { removeAvatar } from "../controllers/user/removeAvatar.controller.js";

import { logoutUser } from "../controllers/user/loginUser.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import {createAbout, createUser} from "../controllers/user/createUser.controller.js";
import { getAboutTest, getTest } from "../controllers/user/getTest.controller.js";
import { getUser } from "../controllers/user/getUser.controller.js";
router.post('/loginUser',loginUser);
router.get('/getTest',getTest)
router.post('/updateUser',updateUser);
router.post('/updateAvatar',upload.single('avatar'),updateAvatar);
router.post('/removeAvatar',removeAvatar);
router.post('/createAbout',createAbout);
router.get('/getAboutTest',getAboutTest);
router.get('/getUser',getUser);
router.get('/logout',logoutUser);

router.get('/createUser',createUser)




export default router;