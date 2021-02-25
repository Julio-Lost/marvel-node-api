require('dotenv').config({
	path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
});

const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;
const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;

const entityPath = process.env.ENTITIES_PATH;
const migrationsPath = process.env.MIGRATIONS_PATH;
const database = process.env.DATABASE;

const url = `postgres://${username}:${password}@${host}:${port}/${database}`;

module.exports = {
	type: 'postgres',
	url: url,
	entities: [entityPath],
	migrations: [migrationsPath],
	synchroize: true,
	migrationsRun: true,
	cli: {
		entitiesDir: './src/domain/entities/',
		migrationsDir: './src/infrastructure/database/migrations/',
	},
};
