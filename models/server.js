const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config')

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths= {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            users: '/api/users',
        }

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
        this.app.use(this.paths.auth, require('../routes/auth.route'));
        this.app.use(this.paths.categories, require('../routes/category.route'));
        this.app.use(this.paths.products, require('../routes/product.route'));
        this.app.use(this.paths.search, require('../routes/search.route'));
        this.app.use(this.paths.users, require('../routes/user.route'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;
