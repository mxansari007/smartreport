import { Router } from "express";
import {upload} from '../middleware/multer.middleware.js';
const router = Router();
import createUser from "../controllers/user/createUser.controller.js";
import updateUser from "../controllers/user/updateUser.controller.js";
import { updateAvatar } from "../controllers/user/updateAvatar.controller.js";
import { removeAvatar } from "../controllers/user/removeAvatar.controller.js";




router.post('/createUser',createUser);
router.post('/updateUser',updateUser);
router.post('/updateAvatar',upload.single('avatar'),updateAvatar);
router.post('/removeAvatar',removeAvatar);




export default router;