import { HttpResponse } from '@shared/useful/httpHelper';

export default interface IComicServiceApplication {
	getComics(userId: string, searchParameter: string): Promise<HttpResponse>;
	getComicCharacterInfo(comicId: string, userId: string): Promise<HttpResponse>;
}
