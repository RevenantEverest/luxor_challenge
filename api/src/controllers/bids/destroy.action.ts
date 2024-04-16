import type { Request, Response } from '@@types/express.js';

import { Bid } from '@@entities/index.js';
import { entities, errors } from '@@utils/index.js';

interface Params {
    collection_id: number,
    id: number
};

async function destroy(req: Request, res: Response<"params" | "auth", Params>) {

    const { auth, params } = res.locals;

    const [bid, findErr] = await entities.findOne<Bid>(Bid, {
        where: {
            id: params.id
        },
        relations: {
            user: true,
            collection: {
                owner: true
            }
        }
    });

    if(findErr || !bid) {
        return errors.sendEntitiesResponse({
            res,
            err: findErr,
            message: "Error deleting Collection",
            entity: bid,
            missingEntityMessage: "Unable to delete Collection"
        });
    }

    const isCollectionOwner = bid.collection.owner.id === auth.id;
    const isBidOwner = bid.user.id === auth.id;

    if(!isBidOwner && !isCollectionOwner) {
        return errors.sendResponse({ res, status: 401, message: "Unauthorized" });
    }

    const [deletedBid, deleteErr] = await entities.destroy<Bid>(Bid, bid);

    if(deleteErr || !deletedBid) {
        return errors.sendEntitiesResponse({
            res,
            err: deleteErr,
            message: "Error deleting Bid",
            entity: deletedBid,
            missingEntityMessage: "Unable to delete Bid"
        });
    }

    return res.sendStatus(200);
};

export default destroy;