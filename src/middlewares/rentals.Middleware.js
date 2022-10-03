import { STATUS_CODE } from "../Enums/statusCode.Enum.js";
import connection from "../database/database.js";


async function postRentalsMiddleware(req, res, next) {

    const { customerId, gameId, daysRented } = req.body;

    if (daysRented <= 0) {
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    try {

        const customer = await connection
            .query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);

        if (!customer.rowCount) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        }

        const game = await connection
            .query(`SELECT * FROM games WHERE id = $1;`, [gameId]);

        if (!game.rowCount) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        }

        if (!game.rows.at(0).stockTotal) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        }

        res.locals.customer = customer.rows.at(0);
        res.locals.game = game.rows.at(0);
        res.locals.daysRented = { daysRented }
        next();

    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }

}

async function postRentalsIdReturnMiddleware(req, res, next) {

    const { id } = req.params;

    try {

        const rent = await connection
            .query('SELECT * FROM rentals WHERE id = $1', [id]);

        if (!rent.rowCount) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        if (rent.rows.at(0).returnDate) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        }

        res.locals.rent = rent.rows.at(0);
        next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }


}


async function deleteRetalsIdMiddleware(req, res, next) {


    const { id } = req.params;

    try {

        const rent = await connection
            .query('SELECT * FROM rentals WHERE id = $1', [id]);

        if (!rent.rowCount) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        if (!rent.rows.at(0).returnDate) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        }

        res.locals.id = { id };
        next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { postRentalsMiddleware, postRentalsIdReturnMiddleware, deleteRetalsIdMiddleware }
