import {Router} from 'express';
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateUser } from '../controllers/user.controllers.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/login").post(registerUser, loginUser);
router.route("/logout").post(verifyToken, logoutUser);
router.route("/update-account").patch(verifyToken, upload.single("avatar"), updateUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/currentUser").get(verifyToken, getCurrentUser);

export default router;