import { SetupServer } from './server';

(async (): Promise<void> => {
	const port = process.env.PORTs || '3333';
	const server = new SetupServer(port);

	await server.init();
	server.start();
})();
