import { getCustomRepository } from 'typeorm';
import IResponseApiMarvelDTO from '../../domain/dtos/IResponseApiMarvelDTO';
import { ResponseApiMarvelViewModel } from '../../domain/models/ResponseApiMarvelViewModel';
import UserCharacterRepository from '../../infrastructure/repositories/UserCharacterRepository';
import UserComicRepository from '../../infrastructure/repositories/UserComicRepository';
import { HttpResponse, ok, serverError } from '../../shared/useful/httpHelper';
import { getApiMarvel, searchApiMarvel } from '../../shared/useful/useFetch';
import ICharacterServiceApplication from './Interfaces/ICharacterServiceApplication';

export class CharacterServiceApplication implements ICharacterServiceApplication {
	public async getCharacters(userId: string, searchParameter: string): Promise<HttpResponse> {
		try {
			const userCharacterRepository = getCustomRepository(UserCharacterRepository);

			const nameStartsWith = `nameStartsWith=${searchParameter}`;
			const response = await searchApiMarvel<IResponseApiMarvelDTO>('characters', nameStartsWith);

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
	public async getCharacterComicInfo(characterId: string, userId: string): Promise<HttpResponse> {
		try {
			const userComicRepository = getCustomRepository(UserComicRepository);

			const response = await getApiMarvel<IResponseApiMarvelDTO>(`characters/${characterId}/comics`);

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
}
