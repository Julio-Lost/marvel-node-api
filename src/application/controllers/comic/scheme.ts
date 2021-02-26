import Joi from 'joi';

export const getComicsScheme = Joi.object({
	userId: Joi.string().required(),
	searchParameter: Joi.string().required(),
});

export const getCharactersOfComicScheme = Joi.object({
	userId: Joi.string().required(),
});
