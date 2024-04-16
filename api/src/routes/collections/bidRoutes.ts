import express from 'express';
import { bidsController } from '@@controllers/index.js';

import { extractPaginationParams, verifyToken, validation } from '@@middleware/index.js';

const router = express.Router();

router.route("/id/:collection_id/bids")
.get(extractPaginationParams, validation.id, bidsController.getByCollectionId)
.post(verifyToken, validation.id, bidsController.create)

router.route("/id/:collection_id/bids/id/:id")
.put(verifyToken, validation.id, bidsController.update)
.delete(verifyToken, validation.id, bidsController.destroy)

router.route("/id/:collection_id/bids/id/:id/accept")
.post(verifyToken, validation.id, bidsController.acceptBid)

export default router;