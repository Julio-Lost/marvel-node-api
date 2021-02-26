import Joi from 'joi';

export const getCharactersScheme = Joi.object({
	userId: Joi.string().required(),
	searchParameter: Joi.string().required(),
});

export const getComicsOfCharacterScheme = Joi.object({
	userId: Joi.string().required(),
});
