import { Bid } from '@@entities/index.js';
import { BidStatus } from '@@entities/Bid.js';
import { faker } from '@faker-js/faker';

export type BidFactory = Record<keyof Pick<Bid, (
    "price" |
    "status"
)>, number | BidStatus>;

function BidFactory(): BidFactory {
    const bid: BidFactory = {
        price: faker.number.float({ min: 1, max: 10000 }),
        status: BidStatus.PENDING
    };

    return bid;
};

export default BidFactory;