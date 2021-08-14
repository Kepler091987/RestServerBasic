const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config')

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Conectar a base de datos
        this.ConnectBD();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        // Lectura y Parseo de body
        this.app.use(express.json());
        //Directorio Publico
        this.app.use(express.static('public'));
    }

    async ConnectBD(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/user.route'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;
