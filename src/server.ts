import 'reflect-metadata';
import { ConnectionDatabase } from './infrastructure/database';
import express, { Express, Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Routes from './application/routes';
import { AuthorizationMiddleware } from './application/middlewares/Authorization';

export class SetupServer {
	protected port: string;
	protected server: Express;

	constructor(port: string) {
		this.server = express();
		this.port = port;
	}

	public async init(): Promise<void> {
		await this.getConnectionDatabase();
		this.setupExpress();
	}

	private async getConnectionDatabase(): Promise<void> {
		try {
			await ConnectionDatabase();
			console.log('Database connection successfully!');
		} catch (error) {
			console.log(error);
		}
	}

	private setupExpress(): void {
		const unless = {
			path: [{ url: /^\/api\/user\/session|\/api\/user\/create-user/ }],
		};

		this.server.use(bodyParser.urlencoded({ extended: true }));
		this.server.use(bodyParser.json());
		this.server.use(cors());
		this.server.use(AuthorizationMiddleware.unless(unless));
		this.server.use('/api', Routes);
	}

	public start(): void {
		this.server.listen(process.env.PORT || this.port, () => {
			console.info('Server listening at', this.port);
		});
	}

	public getServer(): Application {
		return this.server;
	}
}
