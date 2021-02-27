import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Values } from '../constants/value';

export function tokenGenerator(userId: string): string {
	return jwt.sign({ userId }, Values.tokenKey);
}

export async function tokenDecode(token: string): Promise<unknown> {
	let decodedToken: unknown = null;

	jwt.verify(token, Values.tokenKey, (err, decoded) => {
		decoded ? (decodedToken = decoded) : (decodedToken = null);
	});

	return decodedToken;
}
