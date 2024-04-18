import { Collection } from '@@entities/index.js';
import { faker } from '@faker-js/faker';

export type CollectionFactory = Record<keyof Pick<Collection, (
    "name" |
    "description" |
    "price" |
    "stocks"
)>, string | number>;

function CollectionFactory(): CollectionFactory {
    const collection: CollectionFactory = {
        name: faker.word.adjective() + " " + faker.word.noun(),
        description: faker.lorem.sentences(Math.floor(Math.random() * 4)),
        price: faker.number.float({ min: 1, max: 10000 }),
        stocks: faker.number.int({ min: 1, max: 1000 })
    };

    return collection;
};

export default CollectionFactory;