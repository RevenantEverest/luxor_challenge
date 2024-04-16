import express from 'express';
import collectionRoutes from './collectionRoutes.js';
import bidRoutes from './bidRoutes.js';

const router = express.Router();

router.use("/", collectionRoutes);
router.use("/", bidRoutes);

export default router;