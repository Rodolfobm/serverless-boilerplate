import { getOsEnv, toBool, getOsPath, getOsEnvModels, getOsEnvMigrations } from './utils';

/*
    Use utils.ts functions to import values from proccess.env
*/
export const env = {
    app: {
        region: getOsEnv('REGION'),
        stage: getOsEnv('STAGE'),
        url: getOsEnv('URL'),
    },
    database: {
        type: getOsEnv('DATABASE_TYPE'),
        host: getOsEnv('DATABASE_HOST'),
        port: parseInt(getOsEnv('DATABASE_PORT'), 10),
        username: getOsEnv('DATABASE_USERNAME'),
        password: getOsEnv('DATABASE_PASSWORD'),
        database: getOsEnv('DATABASE_NAME'),
        synchronize: toBool(getOsEnv('DATABASE_SYNCHRONIZE')),
        logging: toBool(getOsEnv('DATABASE_LOGGING')),
        entitiesDir: getOsPath('DATABASE_ENTITIES_DIR'),
        entities: getOsEnvModels('DATABASE_ENTITIES'),
        migrationsDir: getOsPath('DATABASE_MIGRATIONS_DIR'),
        migrations: getOsEnvMigrations('DATABASE_MIGRATIONS'),    
    },
};
