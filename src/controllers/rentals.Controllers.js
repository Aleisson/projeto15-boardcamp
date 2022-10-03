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

export { getRentals }