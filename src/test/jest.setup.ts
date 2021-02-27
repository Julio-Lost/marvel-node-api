import { SetupServer } from '../server';
import supertest from 'supertest';
import { getConnection } from 'typeorm';

beforeAll(async () => {
	const server = new SetupServer('3000');
	await server.init();
	global.testRequest = supertest(server.getServer());
});

afterAll(async () => {
	const connection = getConnection();
	await connection.dropDatabase();
	await connection.close();
});
