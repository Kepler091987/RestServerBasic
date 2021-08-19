const express = require('express')
const cors = require('cors');
const fileUpload = require("express-fileupload");
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
            uploads: '/api/uploads',
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
        //Carga de Archivos
        this.app.use(fileUpload({useTempFiles : true, tempFileDir : '/tmp/', createParentPath: true}));
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
        this.app.use(this.paths.uploads, require('../routes/upload.route'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;
