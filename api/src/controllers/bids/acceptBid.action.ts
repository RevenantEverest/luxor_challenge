import type { QueryFailedError } from 'typeorm';
import type { Request, Response } from '@@types/express.js';

import AppDataSource from '@@db/dataSource.js';
import { Bid } from '@@entities/index.js';
import { BidStatus } from '@@entities/Bid.js';
import { entities, errors, logs } from '@@utils/index.js';

interface Params {
    collection_id: number,
    id: number
};

async function acceptBid(req: Request<Body>, res: Response<"auth" | "params", Params>) {
    
    const { auth, params } = res.locals;

    const [findRes, findErr] = await entities.findOne<Bid>(Bid, {
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

    if(findErr || !findRes) {
        return errors.sendEntitiesResponse({
            res,
            err: findErr,
            message: "Error finding Collection",
            entity: findRes,
            missingEntityMessage: "Unable to find Collection"
        });
    }

    const isCollectionOwner = findRes.collection.owner.id === auth.id;

    if(!isCollectionOwner) {
        return errors.sendResponse({ res, status: 401, message: "Unauthorized" });
    }

    /* Reject all bids from current collection that don't have current param id */
    try {
        await AppDataSource.query("UPDATE bids SET status = 'rejected' WHERE id != $1 AND \"collectionId\" = $2", [ 
            params.id,
            params.collection_id
        ]);
    }
    catch(err) {
        const error = err as QueryFailedError;
        logs.error({ type: "[DB]", message: error.message, err: error });
        return errors.sendResponse({ res, status: 500, message: "Unable to accept bid" });
    }

    const [updatedBid, updateErr] = await entities.update<Bid>(Bid, {
        ...findRes,
        status: BidStatus.ACCEPTED
    });

    if(updateErr || !updatedBid) {
        return errors.sendEntitiesResponse({
            res,
            err: updateErr,
            message: "Error updating Bid",
            entity: updatedBid,
            missingEntityMessage: "Unable to update Bid"
        });
    }

    /* Remove unneeded keys from Bid entity return */
    const keysToRemove: Array<keyof Bid> = ["collection", "user"];
    const omittedBid = Object.keys(updatedBid).reduce((obj, key) => {
        const bidKey = key as keyof Bid;
        if (!keysToRemove.includes(bidKey)) {
            obj[bidKey] = updatedBid[bidKey];
        }
        return obj;
    }, {} as { [key: string]: unknown });

    return res.json({ results: omittedBid });
};

export default acceptBid;