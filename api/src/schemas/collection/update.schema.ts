import type { ZodString, ZodNumber } from 'zod';

import { z } from 'zod';
import Collection from '@@entities/Collection.js';
import { validation } from '@@utils/index.js';

type CollectionProperties = keyof Pick<Collection, (
    "id" |
    "name" |
    "description" |
    "stocks" |
    "price"
)>;

type UpdateSchema = Record<CollectionProperties, (
    ZodString |
    ZodNumber
)>;

const errorMessages = validation.basicErrorMessages<CollectionProperties>;

const update = z.object<UpdateSchema>({
    id: z.coerce.number(errorMessages("id", "number")),
    name: z.string(errorMessages("name", "string")),
    description: z.string(errorMessages("description", "string")),
    stocks: z.coerce.number(errorMessages("stocks", "number")),
    price: z.coerce.number(errorMessages("price", "number"))
});

export default update;