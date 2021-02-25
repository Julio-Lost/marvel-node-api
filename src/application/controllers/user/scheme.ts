import Joi from 'joi';

export const sessionSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});

export const createUserSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required(),
});

export const updateSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().allow(''),
	oldPassword: Joi.string().allow(''),
	id: Joi.string().required(),
});

export const addCharacterScheme = Joi.object({
	characterId: Joi.string().required(),
	name: Joi.string().required(),
	description: Joi.string().required(),
	thumbnailUrl: Joi.string().required(),
	detailUrl: Joi.string().required(),
	userId: Joi.string().required(),
});

export const addComicScheme = Joi.object({
	comicId: Joi.string().required(),
	title: Joi.string().required(),
	description: Joi.string().required(),
	thumbnailUrl: Joi.string().required(),
	detailUrl: Joi.string().required(),
	userId: Joi.string().required(),
});

export const removeComicScheme = Joi.object({
	comicId: Joi.string().required(),
	userId: Joi.string().required(),
});

export const removeCharacterScheme = Joi.object({
	characterId: Joi.string().required(),
	userId: Joi.string().required(),
});

export const userIdScheme = Joi.object({
	userId: Joi.string().required(),
});
