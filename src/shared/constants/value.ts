const tokenKey = process.env.TOKEN_JWT_KEY || 'd41d8cd98f00b204e9800998ecf8427e';

const baseUrlMarvelApi = process.env.BASE_URL;
const marvelApiKey = process.env.API_KEY;
const marvelApiHash = process.env.HASH;
const marvelParamTsDefault = process.env.TS_DEFAULT;

export const Values = {
	tokenKey,
	baseUrlMarvelApi,
	marvelApiKey,
	marvelApiHash,
	marvelParamTsDefault,
};
