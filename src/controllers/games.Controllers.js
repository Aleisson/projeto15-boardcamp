import { STATUS_CODE } from "../Enums/statusCode.Enum.js";
import connection from "../database/database.js";

async function getGames(req, res) {

    const { name } = req.query;

    try {

        if (name) {
            //console.log(name);
            const gamesName = (await connection
                .query(`SELECT * FROM games WHERE name LIKE $1;`, [`${name}%`]))
                .rows;
            return res.status(STATUS_CODE.OK).send(gamesName);

        }


        const games = (await connection.query('SELECT * FROM games;')).rows;

        res.status(STATUS_CODE.OK).send(games);

    } catch (error) {
        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { getGames }