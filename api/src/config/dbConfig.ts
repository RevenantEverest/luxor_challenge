import type { DataSourceOptions } from 'typeorm';

import * as Entities from '@@entities/index.js';
import { ENV } from '@@constants/index.js';

const dbConfig: DataSourceOptions = {
    type: ENV.DB_TYPE as "postgres",
    host: ENV.DB_HOST,
    port: parseInt(ENV.DB_PORT, 10),
    database: ENV.DB_NAME,
    username: ENV.DB_USERNAME,
    password: ENV.DB_PASSWORD,
    synchronize: true,
    logging: false,
    entities: Entities,
    migrations: [],
    subscribers: []
};

export default dbConfig;