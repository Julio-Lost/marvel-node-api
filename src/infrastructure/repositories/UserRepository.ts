import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '@domain/entities/UserEntity';
import IUserRepository from '@domain/repositories/IUserRepository';
import ICreateUserDTO from '@domain/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@domain/dtos/IUpdateUserDTO';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> implements IUserRepository {
	public async findByEmail(email: string): Promise<UserEntity | undefined> {
		const user = await this.findOne({ where: { email: email } });
		return user;
	}

	public async findById(userId: string): Promise<UserEntity | undefined> {
		const user = await this.findOne(userId);
		return user;
	}

	public async createUser(data: ICreateUserDTO): Promise<UserEntity> {
		const { email, name, password } = data;

		const user = this.create({ email: email, name: name, password: password });

		await this.save(user);

		return user;
	}

	public async updateUser(data: Omit<IUpdateUserDTO, 'oldPassword'>): Promise<UpdateResult> {
		const { id, email, name, password } = data;

		const response = await this.update({ id }, { email, name, password });
		return response;
	}
}

export default UserRepository;
