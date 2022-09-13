const Producto=require("../models/producto.model")
class Productos{
    listado=[]
    get listado(){
        return this.listado;
    }
    constructor(){
        this.listado=[];
    }
    crear(sku,nombre,descripcion,precio,producto_id){
        const producto=new Producto(sku,nombre,descripcion,precio,producto_id)
        this.listado.push(producto);
        return producto;
    }
    async buscar(id=""){
        const [element, index] = await Promise.all([
            this.listado.find((element) => {
                if(element.id==id){
                    return true;
                }
            }),
            this.listado.findIndex((element) => {
                if(element.id==id){
                    return true;
                }
            })
        ])
        return {element,index}
    }
    
    async borrar(id=""){
        const {element,index} = await this.buscar(id)
        const removed = this.listado.splice(index, 1);
        if(removed){
            return true
        }else{
            return false
        }
    }
    async buscarBySKU(sku=""){
        const enc = await this.listado.find((element) => {
            if(element.sku==sku){
                return true;
            }
        })
        if(enc){
            return enc;
        }else{
            return false;
        }
    }

    async buscarByFiltro(id="",nombre=""){
        let lista=[];
        lista=this.listado
        if (!(id=="")) {
            lista = await lista.filter((el) => el.id.toLowerCase().includes(id.toLowerCase()));
        }
        if (!(nombre=="")) {
            lista = await lista.filter((el) => el.nombre.toLowerCase().includes(nombre.toLowerCase()));
        }
        return lista;
    }
    

    async actualizar(id,sku,nombre,descripcion,precio,categoria_id){
        const {element,index} = await this.buscar(id)
        if(element){
            element.sku=sku;
            element.nombre=nombre;
            element.descripcion=descripcion;
            element.precio=precio;
            element.categoria_id=categoria_id;
            this.listado[index]=element;
        }
        if(element && index>=0){
            return this.listado[index]
        }else{
            return false
        }
    }

    async borrar(id=""){
        const {element,index} = await this.buscar(id)
        if(element && index>=0){
            const removed = this.listado.splice(index, 1);
            if(removed){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }


    cargarFromArray(productos=[]){
        productos.forEach(producto=>{
            this.listado[productos.id]=producto;
        });
    }
}

module.exports=Productos;