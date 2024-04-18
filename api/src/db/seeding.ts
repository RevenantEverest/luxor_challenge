import type { BidStatus } from '@@entities/Bid.js';

import AppDataSource from './dataSource.js';
import waitForPostgres from './waitForPostgres.js';

import { User, Collection, Bid } from '@@entities/index.js';
import { UserFactory, CollectionFactory, BidFactory } from '@@factories/index.js';
import { entities, logs, common, colors } from '@@utils/index.js';

async function seedDatabase() {

    await waitForPostgres(AppDataSource);

    logs.log({ color: colors.success, type: "SEED", message: "Starting seed..." });

    /* Seed Users */
    const users: User[] = [];
    const userAmount = 10;

    for(let i = 0; i < userAmount; i++) {
        const userFactory = UserFactory();
        const [res, err] = await entities.insert<User>(User, userFactory);

        if(err || !res) {
            return logs.error({ type: "SEED", err, message: "Error Saving User Factory" });
        }

        users.push(res);
    }

    /* Seed Collections */
    const collections: Collection[] = [];
    const collectionAmount = 100;

    for(let i = 0; i < collectionAmount; i++) {
        const collectionFactory = CollectionFactory();
        const owner = users[common.RNG(users.length)];

        const [res, err] = await entities.insert<Collection>(Collection, {
            name: collectionFactory.name as string,
            description: collectionFactory.description as string,
            price: collectionFactory.price as number,
            stocks: collectionFactory.stocks as number,
            owner: {
                id: owner.id
            }
        });

        if(err || !res) {
            return logs.error({ type: "SEED", err, message: "Error Saving Collection Factory" });
        }

        collections.push(res);
    }

    /* Seed Bids */
    const bids: Bid[] = [];
    const bidsPerCollection = 10;

    for(let i = 0; i < collectionAmount; i++) {
        const collection = collections[i];

        for(let x = 0; x < bidsPerCollection; x++) {
            const suitableUsers = users.filter((user) =>  user.id !== collection.owner.id);
            const bidFactory = BidFactory();

            const user = suitableUsers[common.RNG(suitableUsers.length)];

            const [res, err] = await entities.insert<Bid>(Bid, {
                price: bidFactory.price as number,
                status: bidFactory.status as BidStatus,
                user: {
                    id: user.id
                },
                collection: {
                    id: collection.id
                }
            });

            if(err || !res) {
                return logs.error({ type: "SEED", err, message: "Error Saving Bid Factory" });
            }

            bids.push(res);
        }
    }

    logs.log({ color: colors.success, type: "SEED", message: "Seeding successful!" });
};

export default seedDatabase;