const { v4:uuid4} =require('uuid')

class Categoria{
    id="";
    corto="";
    nombre="";
    descripcion="";

    constructor(corto,nombre,descripcion){
        this.id=uuid4();
        this.corto=corto;
        this.nombre=nombre;
        this.descripcion=descripcion;
    }
}

module.exports=Categoria;