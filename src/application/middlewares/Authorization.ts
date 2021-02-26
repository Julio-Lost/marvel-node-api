import { NextFunction, Request, Response } from 'express';
import { responseTreated, unauthorized } from '@shared/useful/httpHelper';
import { tokenDecode } from '@src/shared/useful/jsonwebtoken';
import unless from 'express-unless';

export async function AuthorizationMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.body.token || req.headers.authorization;
		let message = '';

		if (!authorizationHeader) {
			message = 'Token is missing';
			const response = unauthorized(message);
			return responseTreated(response, res);
		}
		const [, token] = authorizationHeader.split(' ');
		const userId = await tokenDecode(token);

		if (userId !== null) {
			return next();
		}

		message = 'Invalid token';

		const response = unauthorized(message);
		return responseTreated(response, res);
	} catch (e) {
		return next(e);
	}
}

AuthorizationMiddleware.unless = unless;
