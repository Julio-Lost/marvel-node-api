import { getCustomRepository } from 'typeorm';
import { HttpResponse, ok, serverError } from '@shared/useful/httpHelper';
import IComicServiceApplication from '@application/services/Interfaces/IComicServiceApplication';
import IResponseApiMarvelDTO from '@domain/dtos/IResponseApiMarvelDTO';
import { ResponseApiMarvelViewModel } from '@src/domain/models/ResponseApiMarvelViewModel';
import UserComicRepository from '@infra/repositories/UserComicRepository';
import UserCharacterRepository from '@infra/repositories/UserCharacterRepository';
import { getApiMarvel, searchApiMarvel } from '@src/shared/useful/useFetch';

export class ComicServiceApplication implements IComicServiceApplication {
	public async getComics(userId: string, searchParameter: string): Promise<HttpResponse> {
		try {
			const userComicRepository = getCustomRepository(UserComicRepository);

			const titleStartsWith = `titleStartsWith=${searchParameter}`;
			const response = await searchApiMarvel<IResponseApiMarvelDTO>('comics', titleStartsWith);

			const comics = new ResponseApiMarvelViewModel(response.data);
			const comicsFavorites = await userComicRepository.find({ where: { userId } });

			comicsFavorites.forEach((comicFavorite) => {
				comics.results.forEach((comic) => {
					if (comic.id.toString() === comicFavorite.comicId) {
						comic.isFavorited = true;
					}
				});
			});

			const messageSuccess = 'Comic data obtained successfully';
			const body = comics;

			return ok(body, messageSuccess);
		} catch (error) {
			return serverError(error);
		}
	}
	public async getComicCharacterInfo(comicId: string, userId: string): Promise<HttpResponse> {
		try {
			const userCharacterRepository = getCustomRepository(UserCharacterRepository);

			const response = await getApiMarvel<IResponseApiMarvelDTO>(`comics/${comicId}/characters`);

			const characters = new ResponseApiMarvelViewModel(response.data);
			const charactersFavorites = await userCharacterRepository.find({ where: { userId } });

			charactersFavorites.forEach((characterFavorite) => {
				characters.results.forEach((character) => {
					if (character.id.toString() === characterFavorite.characterId) {
						character.isFavorited = true;
					}
				});
			});

			const messageSuccess = 'Comic data obtained successfully';
			const body = characters;

			return ok(body, messageSuccess);
		} catch (error) {
			return serverError(error);
		}
	}
}
