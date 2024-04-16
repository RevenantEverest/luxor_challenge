import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { CollectionExtraParams } from '@@tests/support/types/extraParams.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { User, Collection } from '@@entities/index.js';
import { truncateTable } from '@@tests/support/database.support.js';
import * as PAYLOADS from '@@tests/support/payloads/collection.payloads.js';

function getRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: CollectionExtraParams<User>) {

    /* Setup DB Rows */
    beforeAll(async () => {
        const userRepository = AppDataSource.getRepository(User);
        const userEntity = userRepository.create({
            email: authPayload.email,
            password: "fakePassword"
        });

        const user = await userEntity.save();
        authPayload.id = user.id;
        extraParams.supportEntities = [user];

        const repository = AppDataSource.getRepository(Collection);
        const entity = repository.create({
            name: PAYLOADS.VALID_CREATE.name,
            description: PAYLOADS.VALID_CREATE.description,
            stocks: Number(PAYLOADS.VALID_CREATE.stocks),
            price: Number(PAYLOADS.VALID_CREATE.price),
            owner: user
        });
        extraParams.entity = await entity.save();
    });

    /* Cleanup */
    afterAll(async () => {
        const repository = AppDataSource.getRepository(Collection);
        await repository.remove(extraParams.entity as Collection);
        await truncateTable<Collection>(repository, "collections");

        if(extraParams.supportEntities) {
            console.log("Truncating Users table...");
            const userRepository = AppDataSource.getRepository(User);
            await userRepository.remove(extraParams.supportEntities[0] as User);
            await truncateTable<User>(userRepository, "users");
        }
    });

    describe("index", () => {
        it("should return a 200 status and paginated collections", async () => {
            const endpoint = baseEndpoint;

            const { body, statusCode } = await supertest(app)
            .get(endpoint)
            .send()

            expect(statusCode).toBe(200);
            expect(body.results).not.toBeNull();

            const { results } = body;

            expect(body).toEqual({
                count: body.count,
                next: null,
                previous: null,
                results: [{
                    id: extraParams.entity?.id,
                    name: extraParams.entity?.name,
                    description: extraParams.entity?.description,
                    stocks: extraParams.entity?.stocks,
                    price: extraParams.entity?.price,
                    owner: {
                        id: authPayload.id,
                        email: authPayload.email
                    },
                    bids: [],
                    created_at: results[0].created_at
                }]
            });
        });
    });

    describe("given the id as a param", () => {
        describe("given the id DOES exist", () => {
            it("should return a 200 status and the collection entity", async () => {
                const endpoint = `${baseEndpoint}/id/${extraParams.entity?.id}`;
                
                const { body, statusCode } = await supertest(app)
                .get(endpoint)
                .send()

                expect(statusCode).toBe(200);
                expect(body.results).not.toBeNull();

                const { results } = body;

                expect(results.id).not.toBeNull();
                expect(results.created_at).not.toBeNull();
                expect(results.updated_at).not.toBeNull();

                expect(results).toEqual({
                    id: extraParams.entity?.id,
                    name: extraParams.entity?.name,
                    description: extraParams.entity?.description,
                    stocks: extraParams.entity?.stocks,
                    price: extraParams.entity?.price,
                    created_at: results.created_at,
                    updated_at: results.updated_at
                });
            });
        });

        describe("given the id DOES NOT exist", () => {
            it("should return a 404 status", async () => {
                const endpoint = `${baseEndpoint}/id/63248761`;
                await supertest(app)
                .get(endpoint)
                .expect(404)
            });
        });
    });
};

export default getRoute;