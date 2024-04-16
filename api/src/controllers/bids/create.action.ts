import type { Request, Response } from '@@types/express.js';

import { z } from 'zod';
import { Bid } from '@@entities/index.js';
import { BidStatus } from '@@entities/Bid.js';
import { bidSchemas } from '@@schemas/index.js';

import { entities, errors } from '@@utils/index.js';

interface Params {
    collection_id: number
};

type Body = z.infer<typeof bidSchemas.create>;

async function create(req: Request<Body>, res: Response<"auth" | "params", Params>) {

    const { auth, params } = res.locals;
    const validatedBody = bidSchemas.create.safeParse(req.body);

    if(!validatedBody.success) {
        return errors.sendInvalidBody<Body>(res, validatedBody.error);
    }

    const [bid, err] = await entities.insert<Bid>(Bid, {
        user: {
            id: auth.id
        },
        collection: {
            id: params.collection_id
        },
        price: Number(req.body.price),
        status: BidStatus.PENDING
    });

    if(err || !bid) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error creating Bid",
            entity: bid,
            missingEntityMessage: "Unable to create Bid"
        });
    }

    return res.json({ results: bid });
};

export default create;