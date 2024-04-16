import type { Request, Response } from '@@types/express.js';

import { Collection } from '@@entities/index.js';
import { entities, errors } from '@@utils/index.js';

interface Params {
    id: number
};

async function getOne(req: Request, res: Response<"params", Params>) {
    
    const { id } = res.locals.params;

    const [collection, err] = await entities.findOne<Collection>(Collection, {
        where: {
            id
        }
    });

    if(err || !collection) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error finding Collection",
            entity: collection,
            missingEntityMessage: "Unable to find Collection"
        });
    }

    return res.json({ results: collection });
};

export default getOne;