import { DeleteResult, EntityRepository, Repository } from 'typeorm';

import { UserCharacterEntity } from '@domain/entities/UserCharacterEntity';
import IUserCharacterRepository from '@domain/repositories/IUserCharacterRepository';
import ICreateUserCharacterDTO from '@domain/dtos/ICreateUserCharacterDTO';

@EntityRepository(UserCharacterEntity)
class UserCharacterRepository extends Repository<UserCharacterEntity> implements IUserCharacterRepository {
	public async createUserCharacter(data: ICreateUserCharacterDTO): Promise<UserCharacterEntity> {
		const { characterId, userId, name, description, thumbnailUrl, detailUrl } = data;
		const userCharacter = this.create({
			characterId,
			userId,
			name,
			description,
			thumbnailUrl,
			detailUrl,
		});

		await this.save(userCharacter);

		return userCharacter;
	}

	public async deleteUserCharacter(characterId: string, userId: string): Promise<DeleteResult> {
		const response = await this.delete({ characterId: characterId, userId: userId });

		return response;
	}

	public async findById(userCharacterId: string): Promise<UserCharacterEntity | undefined> {
		const userCharacter = await this.findOne(userCharacterId);

		return userCharacter;
	}
}

export default UserCharacterRepository;
