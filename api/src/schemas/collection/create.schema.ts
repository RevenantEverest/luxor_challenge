import type { ZodString, ZodNumber } from 'zod';

import { z } from 'zod';
import Collection from '@@entities/Collection.js';
import { validation } from '@@utils/index.js';

type CollectionProperties = keyof Pick<Collection, (
    "name" |
    "description" |
    "stocks" |
    "price"
)>;

type CreateSchema = Record<CollectionProperties, (
    ZodString |
    ZodNumber
)>;

const errorMessages = validation.basicErrorMessages<CollectionProperties>;

const create = z.object<CreateSchema>({
    name: z.string(errorMessages("name", "string")),
    description: z.string(errorMessages("description", "string")),
    stocks: z.coerce.number(errorMessages("stocks", "number")),
    price: z.coerce.number(errorMessages("price", "number"))
});

export default create;