import { DeleteResult } from 'typeorm';

import { UserCharacterEntity } from '@domain/entities/UserCharacterEntity';
import ICreateUserCharacterDTO from '@domain/dtos/ICreateUserCharacterDTO';

export default interface IUserCharacterRepository {
	createUserCharacter(data: ICreateUserCharacterDTO): Promise<UserCharacterEntity>;
	deleteUserCharacter(characterId: string, userId: string): Promise<DeleteResult>;
	findById(userCharacterId: string): Promise<UserCharacterEntity | undefined>;
}
