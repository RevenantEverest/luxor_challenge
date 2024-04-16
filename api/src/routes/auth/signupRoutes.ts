import express from 'express';
import { signupController } from '@@controllers/auth/index.js';

const router = express.Router();

router.route("/")
.post(signupController.signup)

export default router;