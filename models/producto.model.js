const { v4: uuid4 } = require('uuid')

class Producto {
    id = "";
    sku = "";
    nombre = "";
    descripcion = "";
    precio = 0;
    categoria_id = "";


    constructor(sku, nombre, descripcion,precio,categoria_id) {
        this.id = uuid4();
        this.sku = sku;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.categoria_id = categoria_id;
    }
}

module.exports = Producto;