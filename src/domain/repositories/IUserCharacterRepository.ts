import { DeleteResult } from 'typeorm';

import { UserCharacterEntity } from '../entities/UserCharacterEntity';
import ICreateUserCharacterDTO from '../dtos/ICreateUserCharacterDTO';

export default interface IUserCharacterRepository {
	createUserCharacter(data: ICreateUserCharacterDTO): Promise<UserCharacterEntity>;
	deleteUserCharacter(characterId: string, userId: string): Promise<DeleteResult>;
	findById(userCharacterId: string): Promise<UserCharacterEntity | undefined>;
}
