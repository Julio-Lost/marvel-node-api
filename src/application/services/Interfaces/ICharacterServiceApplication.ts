import { HttpResponse } from '@shared/useful/httpHelper';

export default interface ICharacterServiceApplication {
	getCharacters(userId: string, searchParameter: string): Promise<HttpResponse>;
	getCharacterComicInfo(characterId: string, userId: string): Promise<HttpResponse>;
}
