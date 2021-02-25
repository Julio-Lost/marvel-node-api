import 'reflect-metadata';
import { ConnectionDatabase } from './infrastructure/database';
import express, { Express, Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export class SetupServer {
	protected porta: string;
	protected server: Express;

	constructor(porta: string) {
		this.server = express();
		this.porta = porta;
	}

	public async init(): Promise<void> {
		await this.getConnectionDatabase();
		this.setupExpress();
	}

	private async getConnectionDatabase(): Promise<void> {
		try {
			await ConnectionDatabase();
			console.log('Database connection successfully established!');
		} catch (error) {
			console.log(error);
		}
	}

	private setupExpress(): void {
		this.server.use(bodyParser.urlencoded({ extended: true }));
		this.server.use(bodyParser.json());
		this.server.use(cors());
	}

	public start(): void {
		this.server.listen(process.env.PORT || this.porta, () => {
			console.info('Server listening at', this.porta);
		});
	}

	public getServer(): Application {
		return this.server;
	}
}
