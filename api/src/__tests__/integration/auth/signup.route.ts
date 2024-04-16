import type { Application } from 'express';

import supertest from 'supertest';
import * as PAYLOADS from '@@tests/support/payloads/auth.payloads.js';

function loginRoute(baseEndpoint: string, app: Application) {

    describe("given a VALID payload", () => {
        it("should return a 200 status", async () => {
            const endpoint = `${baseEndpoint}/signup`;

            const { statusCode } = await supertest(app)
            .post(endpoint)
            .send(PAYLOADS.VALID_CREATE)

            expect(statusCode).toBe(200);
        });
    });

    describe("given a user with a given email already exists", () => {
        it("should return a 400 status", async () => {
            const endpoint = `${baseEndpoint}/signup`;

            const { statusCode } = await supertest(app)
            .post(endpoint)
            .send(PAYLOADS.VALID_CREATE)

            expect(statusCode).toBe(400);
        });
    });

    describe("given an INVALID payload", () => {
        it("should return a 400 status and error messages", async () => {
            const endpoint = `${baseEndpoint}/signup`;

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