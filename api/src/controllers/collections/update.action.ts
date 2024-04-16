import type { Request, Response } from '@@types/express.js';

import { z } from 'zod';
import { Collection } from '@@entities/index.js';
import { collectionSchemas } from '@@schemas/index.js';
import { entities, errors } from '@@utils/index.js';

interface Params {
    id: number
};

type Body = z.infer<typeof collectionSchemas.update>;

async function update(req: Request<Body>, res: Response<"auth" | "params", Params>) {
    
    const { id } = res.locals.params;

    const validatedBody = collectionSchemas.update.safeParse(req.body);

    if(!validatedBody.success) {
        return errors.sendInvalidBody<Body>(res, validatedBody.error);
    }

    const [findRes, findErr] = await entities.findOne<Collection>(Collection, {
        where: {
            id
        },
        relations: {
            owner: true
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

    if(findRes.owner.id !== res.locals.auth.id) {
        return errors.sendResponse({ res, status: 401, message: "Unauthorized" });
    }

    const [updatedCollection, updateErr] = await entities.update<Collection>(Collection, {
        id: findRes.id,
        name: req.body.name as string,
        description: req.body.description as string,
        stocks: Number(req.body.stocks),
        price: Number(req.body.price)
    });

    if(updateErr || !updatedCollection) {
        return errors.sendEntitiesResponse({
            res,
            err: updateErr,
            message: "Error updating Collection",
            entity: updatedCollection,
            missingEntityMessage: "Unable to update Collection"
        });
    }

    return res.json({ results: updatedCollection });
};

export default update;