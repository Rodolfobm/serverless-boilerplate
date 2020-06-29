import {ConnectionOptions} from 'typeorm';
import { env } from '../../env/env';

const connectionOpt: ConnectionOptions = {
    type: env.database.type as any,
    host: env.database.host,
    port: env.database.port,
    username: env.database.username,
    password: env.database.password,
    database: env.database.database,
    synchronize: env.database.synchronize,
    logging: env.database.logging,
    entities: env.database.entities,
    migrations: env.database.migrations,
    cli: {
        entitiesDir: env.database.entitiesDir,
        migrationsDir: env.database.migrationsDir,
    },
};

export default connectionOpt;
