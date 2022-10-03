import { STATUS_CODE } from "../Enums/statusCode.Enum.js";
import connection from "../database/database.js";
import dayjs from 'dayjs'



async function getRentals(req, res) {

    const { customerId } = req.query;
    const { gameId } = req.query;

    try {

        if (customerId) {
            const rentals = (await connection
                .query(`SELECT 
                            rentals.*, 
                            customers."name" AS "customerName", 
                            games."name" AS "gameName",
                            games."categoryId", 
                            categories."name" AS "categoryName" 
                            FROM rentals 
                                JOIN customers ON  rentals."customerId" = customers.id
                                JOIN games ON games.id = rentals."gameId"
                                JOIN categories ON categories.id = games."categoryId"
                                WHERE customers.id = $1;`, [customerId]))
                .rows.map((rent) => ({
                    id: rent.id,
                    customerId: rent.customerId,
                    gameId: rent.gameId,
                    rentDate: dayjs(rent.rentDate).format('YYYY-MM-DD'),
                    daysRented: rent.daysRented,
                    returnDate: rent.returnDate,
                    originalPrice: rent.originalPrice,
                    delayFee: rent.delayFee,
                    customer: {
                        id: rent.customerId,
                        name: rent.customerName
                    },
                    game: {
                        id: rent.gameId,
                        name: rent.gameName,
                        categoryId: rent.categoryId,
                        categoryName: rent.categoryName,
                    },
                }));

            return res.status(STATUS_CODE.OK).send(rentals);
        }

        if (gameId) {
            const rentals = (await connection
                .query(`SELECT 
                            rentals.*, 
                            customers."name" AS "customerName", 
                            games."name" AS "gameName",
                            games."categoryId", 
                            categories."name" AS "categoryName" 
                            FROM rentals 
                                JOIN customers ON  rentals."customerId" = customers.id
                                JOIN games ON games.id = rentals."gameId"
                                JOIN categories ON categories.id = games."categoryId"
                                WHERE games.id = $1;`, [gameId]))
                .rows.map((rent) => ({
                    id: rent.id,
                    customerId: rent.customerId,
                    gameId: rent.gameId,
                    rentDate: dayjs(rent.rentDate).format('YYYY-MM-DD'),
                    daysRented: rent.daysRented,
                    returnDate: rent.returnDate,
                    originalPrice: rent.originalPrice,
                    delayFee: rent.delayFee,
                    customer: {
                        id: rent.customerId,
                        name: rent.customerName
                    },
                    game: {
                        id: rent.gameId,
                        name: rent.gameName,
                        categoryId: rent.categoryId,
                        categoryName: rent.categoryName,
                    },
                }));

            return res.status(STATUS_CODE.OK).send(rentals);
        }

        const rentals = (await connection
            .query(`SELECT 
                        rentals.*, 
                        customers."name" AS "customerName", 
                        games."name" AS "gameName",
                        games."categoryId", 
                        categories."name" AS "categoryName" 
                        FROM rentals 
                            JOIN customers ON  rentals."customerId" = customers.id
                            JOIN games ON games.id = rentals."gameId"
                            JOIN categories ON categories.id = games."categoryId";`))
            .rows.map((rent) => ({
                id: rent.id,
                customerId: rent.customerId,
                gameId: rent.gameId,
                rentDate: dayjs(rent.rentDate).format('YYYY-MM-DD'),
                daysRented: rent.daysRented,
                returnDate: rent.returnDate,
                originalPrice: rent.originalPrice,
                delayFee: rent.delayFee,
                customer: {
                    id: rent.customerId,
                    name: rent.customerName
                },
                game: {
                    id: rent.gameId,
                    name: rent.gameName,
                    categoryId: rent.categoryId,
                    categoryName: rent.categoryName,
                },
            }));

        return res.status(STATUS_CODE.OK).send(rentals);

    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

function postRentals(req, res) {

    const customer = res.locals.customer;
    const game = res.locals.game;
    const { daysRented } = res.locals.daysRented;
    console.log(game.pricePerDay * daysRented);
    connection.query(`INSERT INTO rentals(
                        "customerId", 
                        "gameId", 
                        "rentDate", 
                        "daysRented", 
                        "returnDate", 
                        "originalPrice", 
                        "delayFee") 
                        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
            customer.id,
            game.id,
            dayjs().format('YYYY-MM-DD'),
            daysRented,
            null,
            (game.pricePerDay * daysRented),
            null
        ]);
    connection
        .query(`UPDATE games SET "stockTotal" = $1 WHERE id = $2`,
            [game.stockTotal - 1, game.id])

    return res.sendStatus(STATUS_CODE.CREATED);

}

async function postRentalsIdReturn(req, res) {


    const rent = res.locals.rent;
    console.log(rent);
    rent.returnDate = dayjs().format('YYYY-MM-DD')

    //console.log(rent.returnDate)
    if (dayjs().diff(dayjs(rent.rentDate)) > 0) {
        rent.delayFee = Math.trunc((rent.originalPrice / rent.daysRented))
            * Math.trunc(dayjs().diff(dayjs(rent.rentDate))
                / (1000 * 3600 * 24)) * 2;
    }

    try {

        connection.query(`UPDATE 
                            rentals SET 
                            "returnDate"= $1,
                            "delayFee"= $2 
                            WHERE id = $3`,
            [rent.returnDate,
            rent.delayFee,
            rent.id])
        return res.sendStatus(STATUS_CODE.OK);
    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { getRentals, postRentals, postRentalsIdReturn }