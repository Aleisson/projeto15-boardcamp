import { STATUS_CODE } from '../enums/statusCode.enum.js'

async function getCategorias(req, res) {

    try {
        console.log("aqui");    
        res.status(STATUS_CODE.NOT_IMPLEMENTED).send("<h1>GET CATEGORIAS</h1>");

    } catch (error) {
        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { getCategorias }