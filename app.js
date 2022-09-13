require('dotenv').config();
const Server = require('./server/server');
const serve= new Server();
serve.listen();