import type { Request, Response } from '@@types/express.js';

import { z } from 'zod';
import { Collection } from '@@entities/index.js';
import { collectionSchemas } from '@@schemas/index.js';

import { entities, errors } from '@@utils/index.js';

type Body = z.infer<typeof collectionSchemas.create>;

async function create(req: Request<Body>, res: Response<"auth">) {

    const validatedBody = collectionSchemas.create.safeParse(req.body);

    if(!validatedBody.success) {
        return errors.sendInvalidBody<Body>(res, validatedBody.error);
    }

    const [collection, err] = await entities.insert<Collection>(Collection, {
        name: req.body.name as string,
        description: req.body.description as string,
        stocks: Number(req.body.stocks),
        price: Number(req.body.price),
        owner: {
            id: res.locals.auth.id
        }
    });

    if(err || !collection) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error creating Collection",
            entity: collection,
            missingEntityMessage: "Unable to create Collection"
        });
    }

    return res.json({ results: collection });
};

export default create;