import type { Request, Response } from '@@types/express.js';
import type { IndexOptions } from '@@types/entities.js';
import type { FindOptionsSelect } from 'typeorm';

import { Collection } from '@@entities/index.js';
import { entities, errors, pagination } from '@@utils/index.js';

async function index(req: Request, res: Response<"pagination">) {
    
    const { limit, offset } = res.locals.pagination;

    const indexOptions: IndexOptions = { limit, offset };

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

    const [collections, err] = await entities.indexAndCount<Collection>(Collection, indexOptions, {
        select: {
            ...baseSelect,
            ...ownerSelect
        },
        relations: {
            owner: true
        },
        order: {
            id: "ASC"
        }
    });

    if(err || !collections) {
        return errors.sendEntitiesResponse({
            res,
            err,
            message: "Error indexing Collections",
            entity: collections,
            missingEntityMessage: "Unable to index Collections"
        });
    }

    const paginatedResponse = pagination.paginateResponse<Collection>(req, res, collections);

    return res.json(paginatedResponse);
};

export default index;