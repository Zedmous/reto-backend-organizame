const express = require('express')
const cors = require('cors');
//const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.routerAuth='/api/auth';
        this.routerCategorias='/api/categorias';
        this.routerProductos='/api/productos';
        
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    async conectarDB(){
        //console.log('Db corriendo')
    }
    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.routerAuth,require('../routes/usuario.route'))
        this.app.use(this.routerCategorias,require('../routes/categoria.route'))
        this.app.use(this.routerProductos,require('../routes/producto.route'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto","localhost:"+this.port)
        })
    }
}
module.exports = Server;