const host = process.env.DATABASE_HOST;
const port = process.env.DATABASE_PORT;
const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;

const entityPath = process.env.ENTITIES_PATH;
const migrationsPath = process.env.MIGRATIONS_PATH;
const database = process.env.DATABASE;

const url = `postgres://${username}:${password}@${host}:${port}/${database}`;

export default [
	{
		name: 'test',
		type: 'sqlite',
		database: ':memory:',
		dropSchema: true,
		logging: false,
		synchroize: true,
		migrationsRun: true,
		entities: [entityPath],
		migrations: [migrationsPath],
		cli: {
			entitiesDir: './src/domain/entities/',
			migrationsDir: './src/infrastructure/database/migrations/',
		},
	},
	{
		name: 'development',
		type: 'postgres',
		host: host,
		port: port,
		username: username,
		password: password,
		database: 'stone',
		logging: false,
		entities: [entityPath],
		migrations: [migrationsPath],
		cli: {
			entitiesDir: './src/domain/entities/',
			migrationsDir: './src/infrastructure/database/migrations/',
		},
	},
	{
		name: 'production',
		type: 'postgres',
		url: url,
		logging: false,
		ssl: true,
		extra: {
			ssl: {
				rejectUnauthorized: false,
			},
		},
		entities: [entityPath],
		migrations: [migrationsPath],
		cli: {
			entitiesDir: './src/domain/entities/',
			migrationsDir: './src/infrastructure/database/migrations/',
		},
	},
];
