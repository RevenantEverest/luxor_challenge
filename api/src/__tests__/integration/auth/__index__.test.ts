import type { AuthExtraParams } from '@@tests/support/types/extraParams.js';

import AppDataSource from '@@db/dataSource.js';
import initializeApp from '@@root/app.js';

import { connectToTestingDatabase } from '@@tests/support/database.support.js';
import { DATABASE } from '@@tests/support/constants/index.js';

import loginRouteSpec from './login.route.js';
import signupRouteSpec from './signup.route.js';

const app = initializeApp();
const baseEndpoint = "/auth";

const extraParams: AuthExtraParams = {};

describe("Voice Actors Route", () => {
    beforeAll(async () => {
        await connectToTestingDatabase();
    }, DATABASE.DB_TIMEOUT);

    afterAll(() => {
        AppDataSource.destroy();
        jest.clearAllMocks();
    });

    describe("login route", () => {
        loginRouteSpec(baseEndpoint, app, extraParams);
    });

    describe("signup route", () => {
        signupRouteSpec(baseEndpoint, app);
    });
});