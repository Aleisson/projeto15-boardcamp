import { STATUS_CODE } from '../Enums/statusCode.Enum.js'
import connection from '../database/database.js'


async function getCustomers(req, res) {


    const { cpf } = req.query;

    try {

        if (cpf) {
            const customersCpf = (await connection
                .query('SELECT * FROM customers WHERE cpf LIKE $1;', [`${cpf}%`]))
                .rows;
            return res.status(STATUS_CODE.OK).send(customersCpf);
        }

        const customers = (await connection
            .query('SELECT * FROM customers;'))
            .rows;

        return res.status(STATUS_CODE.OK).send(customers);

    } catch (error) {


        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);

    }

}

export { getCustomers }