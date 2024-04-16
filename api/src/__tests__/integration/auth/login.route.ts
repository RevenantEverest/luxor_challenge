import type { Application } from 'express';
import type { AuthExtraParams } from '@@tests/support/types/extraParams.js';
import type { AuthPayload } from '@@types/auth';

import bcrypt from 'bcrypt';
import supertest from 'supertest';
import AppDataSource from '@@db/dataSource.js';
import { User } from '@@entities/index.js';
import { truncateTable } from '@@tests/support/database.support.js';
import * as PAYLOADS from '@@tests/support/payloads/auth.payloads.js';

function loginRoute(baseEndpoint: string, app: Application, extraParams: AuthExtraParams) {

    /* Setup DB Rows */
    beforeAll(async () => {
        const repository = AppDataSource.getRepository(User);
        const hashedPassword = await bcrypt.hash(PAYLOADS.VALID_CREATE.password, 10);
        const entity = repository.create({
            email: PAYLOADS.VALID_CREATE.email,
            password: hashedPassword
        });
        extraParams.entity = await entity.save();
    });

    /* Cleanup */
    afterAll(async () => {
        const repository = AppDataSource.getRepository(User);
        await repository.remove(extraParams.entity as User);
        await truncateTable<User>(repository, "users");
    });

    describe("given a VALID payload", () => {
        it("should return a 200 status and the auth payload", async () => {
            const endpoint = `${baseEndpoint}/login`;

            const { body, statusCode } = await supertest(app)
            .post(endpoint)
            .send(PAYLOADS.VALID_CREATE)

            expect(statusCode).toBe(200);
            expect(body.results).not.toBeNull();

            const { results } = body;

            expect(results.id).not.toBeNull();
            expect(results.created_at).not.toBeNull();
            expect(results.updated_at).not.toBeNull();

            expect(results).toEqual<AuthPayload>({
                id: results.id,
                email: PAYLOADS.VALID_CREATE.email,
                token: results.token,
                permissions: "USER"
            });
        });
    });

    describe("given an INVALID payload", () => {
        it("should return a 400 status and error messages", async () => {
            const endpoint = `${baseEndpoint}/login`;

            const { body, statusCode } = await supertest(app)
            .post(endpoint)
            .send(PAYLOADS.INVALID_CREATE)

            expect(statusCode).toBe(400);

            expect(body.error).toBe(true);
            expect(body.message).not.toBeNull();
            expect(body.issues.length).toBeGreaterThan(0);
        });
    });
};

export default loginRoute;