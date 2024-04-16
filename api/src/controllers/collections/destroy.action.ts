import type { Request, Response } from '@@types/express.js';

import { Collection } from '@@entities/index.js';
import { entities, errors } from '@@utils/index.js';

interface Params {
    id: number
};

async function destroy(req: Request, res: Response<"params" | "auth", Params>) {

    const { id } = res.locals.params;

    const [collection, findErr] = await entities.findOne<Collection>(Collection, {
        where: {
            id
        },
        relations: ["owner"]
    });

    if(findErr || !collection) {
        return errors.sendEntitiesResponse({
            res,
            err: findErr,
            message: "Error deleting Collection",
            entity: collection,
            missingEntityMessage: "Unable to delete Collection"
        });
    }
    
    if(collection.owner.id !== res.locals.auth.id) {
        return errors.sendResponse({ res, status: 401, message: "Unauthorized" });
    }

    const [deletedCollection, deleteErr] = await entities.destroy<Collection>(Collection, collection);

    if(deleteErr || !deletedCollection) {
        return errors.sendEntitiesResponse({
            res,
            err: deleteErr,
            message: "Error deleting Collection",
            entity: deletedCollection,
            missingEntityMessage: "Unable to delete Collection"
        });
    }

    return res.sendStatus(200);
};

export default destroy;