const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;
const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;

const entityPath = process.env.ENTITIES_PATH;
const migrationsPath = process.env.MIGRATIONS_PATH;
const database = process.env.DATABASE;

const url = `postgres://${username}:${password}@${host}:${port}/${database}`;

export const type = 'postgres';
export const url = url;
export const entities = [entityPath];
export const migrations = [migrationsPath];
export const synchroize = true;
export const migrationsRun = true;
export const cli = {
	entitiesDir: './src/domain/entities/',
	migrationsDir: './src/infrastructure/database/migrations/',
};
