import Joi from "joi";

const postGamesSchema = Joi.object({

    name: Joi.string().required(),
    stockTotal: Joi.number().min(1).required(),
    pricePerDay: Joi.number().min(1).required(),

});

export { postGamesSchema }