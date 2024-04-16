import type { ZodNativeEnum, ZodString, ZodNumber } from 'zod';

import { z } from 'zod';
import Bid, { BidStatus } from '@@entities/Bid.js';
import { validation } from '@@utils/index.js';

type BidProperties = keyof Pick<Bid, (
    "id" |
    "user" |
    "collection" |
    "price" |
    "status"
)>;

type UpdateSchema = Record<BidProperties, (
    ZodString |
    ZodNumber |
    ZodNativeEnum<typeof BidStatus>
)>;

const errorMessages = validation.basicErrorMessages<BidProperties>;
const errorMapMessages = validation.errorMapMessages<BidProperties>;

const update = z.object<UpdateSchema>({
    id: z.coerce.number(errorMessages("id", "number")),
    user: z.string(errorMessages("user", "string")),
    collection: z.coerce.number(errorMessages("collection", "number")),
    price: z.coerce.number(errorMessages("price", "number")),
    status: z.nativeEnum(BidStatus, {
        errorMap: (issue, _ctx) => errorMapMessages({
            issue,
            _ctx,
            field: "status",
            type: "enum",
            enumObj: BidStatus
        })
    })
});

export default update;