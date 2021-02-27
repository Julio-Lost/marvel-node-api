import ICreateUserDTO from '../../../domain/dtos/ICreateUserDTO';
import IUpdateUserDTO from '../../../domain/dtos/IUpdateUserDTO';
import ICreateUserCharacterDTO from '../../../domain/dtos/ICreateUserCharacterDTO';
import ICreateUserComicDTO from '../../../domain/dtos/ICreateUserComicDTO';
import { HttpResponse } from '../../../shared/useful/httpHelper';

export default interface IUserServiceApplication {
	createUser(data: ICreateUserDTO): Promise<HttpResponse>;
	session(email: string, password: string): Promise<HttpResponse>;
	updateUser(data: IUpdateUserDTO): Promise<HttpResponse>;
	addCharacterFavorite(data: ICreateUserCharacterDTO): Promise<HttpResponse>;
	addComicFavorite(data: ICreateUserComicDTO): Promise<HttpResponse>;
	removeCharacterFavorite(characterId: string, userId: string): Promise<HttpResponse>;
	removeComicFavorite(comicId: string, userId: string): Promise<HttpResponse>;
	getCharactersFavorite(userId: string): Promise<HttpResponse>;
	getComicsFavorite(userId: string): Promise<HttpResponse>;
}
