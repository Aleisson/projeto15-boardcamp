import Joi, { string } from 'joi';

const postCategoriasSchema = Joi.object({

    name: Joi.string().required(),

});

export { postCategoriasSchema }
