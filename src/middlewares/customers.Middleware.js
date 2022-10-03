import { STATUS_CODE } from "../Enums/statusCode.Enum.js";
import connection from "../database/database.js";
import { postCustomersSchema } from "../schemas/customers.Schema.js";


async function customerMiddleware(req, res, next) {

    const customer = req.body;

    const isValid = postCustomersSchema.validate(customer);

    if (isValid.error) {
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    try {
        const checkCpf = await connection
            .query('SELECT * FROM customers WHERE cpf = $1;', [customer.cpf]);

        if (checkCpf.rowCount) {
            return res.sendStatus(STATUS_CODE.CONFLICT);
        }

    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
    res.locals.customer = customer;
    next();

}

export { customerMiddleware }