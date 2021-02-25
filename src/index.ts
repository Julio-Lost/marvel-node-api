import { SetupServer } from './server';

(async (): Promise<void> => {
	const port = process.env.PORT || '3333';
	const server = new SetupServer(port);

	await server.init();
	server.start();
})();
