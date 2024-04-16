import type { Request, Response } from '@@types/express.js';

import { z } from 'zod';
import { Bid } from '@@entities/index.js';
import { bidSchemas } from '@@schemas/index.js';
import { entities, errors } from '@@utils/index.js';

interface Params {
    collection_id: number,
    id: number
};

type Body = z.infer<typeof bidSchemas.update>;

async function update(req: Request<Body>, res: Response<"auth" | "params", Params>) {
    
    const { auth, params } = res.locals;

    const validatedBody = bidSchemas.update.safeParse(req.body);

    if(!validatedBody.success) {
        return errors.sendInvalidBody<Body>(res, validatedBody.error);
    }

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

    if(findRes.user.id !== auth.id) {
        return errors.sendResponse({ res, status: 401, message: "Unauthorized" });
    }

    const [updatedBid, updateErr] = await entities.update<Bid>(Bid, {
        id: findRes.id,
        price: Number(req.body.price)
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

    return res.json({ results: updatedBid });
};

export default update;