import express from 'express';
import { collectionsController } from '@@controllers/index.js';

import { extractPaginationParams, verifyToken, validation } from '@@middleware/index.js';

const router = express.Router();

router.route("/")
.get(extractPaginationParams, collectionsController.index)
.post(verifyToken, collectionsController.create)

router.route("/id/:id")
.get(validation.id, collectionsController.getOne)
.put(verifyToken, validation.id, collectionsController.update)
.delete(verifyToken, validation.id, collectionsController.destroy)

export default router;