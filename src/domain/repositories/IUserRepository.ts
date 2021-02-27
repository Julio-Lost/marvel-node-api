import { UpdateResult } from 'typeorm';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import { UserEntity } from '../entities/UserEntity';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

export default interface IUserRepository {
	createUser(data: ICreateUserDTO): Promise<UserEntity>;
	updateUser(data: IUpdateUserDTO): Promise<UpdateResult>;
	findById(userId: string): Promise<UserEntity | undefined>;
	findByEmail(email: string): Promise<UserEntity | undefined>;
}
