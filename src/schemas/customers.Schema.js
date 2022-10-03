import Joi from "joi";

const postCustomersSchema = Joi.object({

    name: Joi.string().required(),
    cpf: Joi.string().length(11).required(),
    phone: Joi.string().min(10).max(11).required(),
    birthday: Joi.date().required(),

});

export { postCustomersSchema }