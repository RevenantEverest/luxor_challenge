import type { Request, Response } from '@@types/express.js';
import type { FindOptionsSelect } from 'typeorm';

import { Collection } from '@@entities/index.js';
import { entities, errors } from '@@utils/index.js';

interface Params {
    id: number
};

async function getOne(req: Request, res: Response<"params", Params>) {
    
    const { id } = res.locals.params;

    const baseSelect: FindOptionsSelect<Collection> = {
        id: true,
        name: true,
        description: true,
        stocks: true,
        price: true,
        created_at: true
    };

    const ownerSelect: FindOptionsSelect<Collection> = {
        owner: {
            id: true,
            email: true
        }
    };

    const [collection, err] = await entities.findOne<Collection>(Collection, {
        select: {
            ...baseSelect,
            ...ownerSelect
        },
        relations: {
            owner: true
        },
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