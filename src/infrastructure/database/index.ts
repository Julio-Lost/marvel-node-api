import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export const ConnectionDatabase = async (): Promise<Connection> => {
	const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
	return createConnection({ ...connectionOptions, name: 'default' });
};
