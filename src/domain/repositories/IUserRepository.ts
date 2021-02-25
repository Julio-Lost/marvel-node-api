import { UpdateResult } from 'typeorm';

import ICreateUserDTO from '@domain/dtos/ICreateUserDTO';
import { UserEntity } from '@domain/entities/UserEntity';
import IUpdateUserDTO from '@domain/dtos/IUpdateUserDTO';

export default interface IUserRepository {
	createUser(data: ICreateUserDTO): Promise<UserEntity>;
	updateUser(data: IUpdateUserDTO): Promise<UpdateResult>;
	findById(userId: string): Promise<UserEntity | undefined>;
	findByEmail(email: string): Promise<UserEntity | undefined>;
}
