import express from 'express';
import collectionRoutes from './collectionRoutes.js';

const router = express.Router();

router.use("/", collectionRoutes);

export default router;