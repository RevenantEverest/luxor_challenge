import type { ZodString, ZodNumber } from 'zod';

import { z } from 'zod';
import Bid from '@@entities/Bid.js';
import { validation } from '@@utils/index.js';

type BidProperties = keyof Pick<Bid, (
    "price"
)>;

type CreateSchema = Record<BidProperties, (
    ZodString |
    ZodNumber
)>;

const errorMessages = validation.basicErrorMessages<BidProperties>;

const create = z.object<CreateSchema>({
    price: z.coerce.number(errorMessages("price", "number"))
});

export default create;

