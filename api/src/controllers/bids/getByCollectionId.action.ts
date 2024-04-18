import type { Request, Response } from '@@types/express.js';

import { Bid } from '@@entities/index.js';

import { entities, errors, pagination } from '@@utils/index.js';

interface Params {
    collection_id: number
};

async function getByCollectionId(req: Request, res: Response<"auth" | "params" | "pagination", Params>) {

    const { params } = res.locals;

    const [bids, err] = await entities.findAndCount<Bid>(Bid, {
        select: {
            id: true,
            price: true,
            status: true,
            created_at: true,
            user: {
                id: true,
                email: true
            }
        },
        where: {
            collection: {
                id: params.collection_id
            }
        },
        relations: {
            user: true
        },
        order: {
            id: "ASC"
        }
    });

    if(err || !bids) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error finding Bids",
            entity: bids,
            missingEntityMessage: "Unable to find Bids"
        });
    }

    const paginatedResponse = pagination.paginateResponse<Bid>(req, res, bids);

    return res.json(paginatedResponse);
};

export default getByCollectionId;