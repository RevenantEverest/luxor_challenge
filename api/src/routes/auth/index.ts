import express from 'express';
import loginRoutes from './loginRoutes.js';
import signupRoutes from './signupRoutes.js';

const router = express.Router();

router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);

export default router;