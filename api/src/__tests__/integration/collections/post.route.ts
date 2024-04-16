import type { Application } from 'express';
import type { AuthTestingPayload } from '@@tests/support/types/auth.js';
import type { CollectionExtraParams } from '@@tests/support/types/extraParams.js';

import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { User, Collection } from '@@entities/index.js';
import { truncateTable } from '@@tests/support/database.support.js';
import * as PAYLOADS from '@@tests/support/payloads/collection.payloads.js';
import issueToken from '@@tests/support/login.support';

function postRoute(baseEndpoint: string, app: Application, authPayload: AuthTestingPayload, extraParams: CollectionExtraParams<User>) {

    /* Setup DB Rows */
    beforeAll(async () => {
        const userRepository = AppDataSource.getRepository(User);
        const userEntity = userRepository.create({
            email: authPayload.email,
            password: "fakePassword"
        });

        const user = await userEntity.save();
        authPayload.id = user.id;
        authPayload = issueToken(authPayload); // Quick fix for JWT token user id not being in database
        extraParams.supportEntities = [user];
    });

    /* Cleanup */
    afterAll(async () => {
        const repository = AppDataSource.getRepository(Collection);
        await repository.remove(extraParams.entity as Collection);
        await truncateTable<Collection>(repository, "collections");

        if(extraParams.supportEntities) {
            const userRepository = AppDataSource.getRepository(User);
            await userRepository.remove(extraParams.supportEntities[0] as User);
            await truncateTable<User>(userRepository, "users");
        }
    });

    describe("given the user is NOT logged in", () => {
        it("should return a 401 status", async () => {
            const endpoint = baseEndpoint;

            await supertest(app)
            .post(endpoint)
            .send(PAYLOADS.VALID_CREATE)
            .expect(401)
        });
    });

    describe("given a VALID payload", () => {
        it("should return a 200 status and the collection", async () => {
            const endpoint = baseEndpoint;

            const { body, statusCode } = await supertest(app)
            .post(endpoint)
            .set("Authorization", `Bearer ${authPayload.bearerToken}`)
            .send(PAYLOADS.VALID_CREATE)

            expect(statusCode).toBe(200);
            expect(body.results).not.toBeNull();

            const { results } = body;

            expect(results).toEqual({
                id: results.id,
                name: PAYLOADS.VALID_CREATE.name,
                description: PAYLOADS.VALID_CREATE.description,
                stocks: Number(PAYLOADS.VALID_CREATE.stocks),
                price: Number(PAYLOADS.VALID_CREATE.price),
                owner: {
                    id: authPayload.id
                },
                created_at: results.created_at,
                updated_at: results.updated_at
            });

            extraParams.entity = results;
        });
    });

    describe("given an INVALID payload", () => {
        it("should return a 400 status and error messages", async () => {
            const endpoint = baseEndpoint;

            const { body, statusCode } = await supertest(app)
            .post(endpoint)
            .set("Authorization", `Bearer ${authPayload.bearerToken}`)
            .send(PAYLOADS.INVALID_CREATE)

            expect(statusCode).toBe(400);

            expect(body.error).toBe(true);
            expect(body.message).not.toBeNull();
            expect(body.issues.length).toBeGreaterThan(0);
        });
    });
};

export default postRoute;