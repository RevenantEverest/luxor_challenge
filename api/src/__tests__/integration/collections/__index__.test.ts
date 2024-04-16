import type { CollectionExtraParams } from '@@tests/support/types/extraParams.js';
import type { User } from '@@entities/index.js';

import AppDataSource from '@@db/dataSource.js';
import initializeApp from '@@root/app.js';
import issueToken from '@@tests/support/login.support.js';

import { connectToTestingDatabase } from '@@tests/support/database.support.js';
import { DATABASE } from '@@tests/support/constants/index.js';

import * as AUTH_PAYLOADS from '@@tests/support/payloads/auth.payloads.js';

import getRouteSpec from './get.route.js';
import postRouteSpec from './post.route.js';

const authPayload = issueToken(AUTH_PAYLOADS.MAIN);
const altAuthPayload = issueToken(AUTH_PAYLOADS.ALT);

const app = initializeApp();
const baseEndpoint = "/collections";

const extraParams: CollectionExtraParams<User> = {
    altAuthPayload
};

describe("Collection Routes", () => {
    beforeAll(async () => {
        await connectToTestingDatabase();
    }, DATABASE.DB_TIMEOUT);

    afterAll(() => {
        AppDataSource.destroy();
        jest.clearAllMocks();
    });

    describe("get route", () => {
        getRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });

    describe("post route", () => {
        postRouteSpec(baseEndpoint, app, authPayload, extraParams);
    });
});