import fetch from 'node-fetch';
import { Values } from '../constants/value';

const baseUrl = Values.baseUrlMarvelApi;
const hash = Values.marvelApiHash;
const apikey = Values.marvelApiKey;
const ts = Values.marvelParamTsDefault;

export async function getApiMarvel<T>(route: string): Promise<T> {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
	};
	const response = await fetch(`${baseUrl}/${route}?ts=${ts}&apikey=${apikey}&hash=${hash}`, options);
	const payload: T = await response.json();
	return payload;
}

export async function searchApiMarvel<T>(route: string, searchParameter: string): Promise<T> {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
	};
	const response = await fetch(
		`${baseUrl}/${route}?ts=${ts}&apikey=${apikey}&hash=${hash}&${searchParameter}`,
		options
	);
	const payload: T = await response.json();
	return payload;
}
