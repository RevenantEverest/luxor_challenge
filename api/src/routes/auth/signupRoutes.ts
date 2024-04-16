import express from 'express';
import { signupController } from '@@controllers/index.js';

const router = express.Router();

router.route("/")
.post(signupController.signup)

export default router;