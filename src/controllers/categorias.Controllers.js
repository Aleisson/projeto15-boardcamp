import { STATUS_CODE } from '../Enums/statusCode.Enum.js'
import connection from '../database/database.js'

async function getCategories(req, res) {

    try {

        const categories = (await connection.query('SELECT * FROM categories;')).rows;
        console.log(categories);
        res.status(STATUS_CODE.OK).send(categories);

    } catch (error) {
        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

async function postCategories(req, res) {

    const { name } = res.locals.name;

    await connection.query('INSERT INTO categories (name) VALUES ($1);',[name]);

    res.sendStatus(STATUS_CODE.CREATED);
}



export { getCategories, postCategories }