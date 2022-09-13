const Categoria=require("../models/categoria.model")
class Categorias{
    listado=[]
    get listado(){
        return this.listado;
    }
    constructor(){
        this.listado=[];
    }
    crear(corto,nombre,descripcion){
        const categoria=new Categoria(corto,nombre,descripcion)
        this.listado.push(categoria);
        return categoria;
        
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

    async buscarByCorto(corto=""){
        const enc = await this.listado.find((element) => {
            if(element.corto==corto){
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
            console.log("entre id",id, " ok")
            lista = await lista.filter((el) => el.id.toLowerCase().includes(id.toLowerCase()));
            console.log(lista)
        }
        if (!(nombre=="")) {
            console.log("entre nombre",nombre, " ok")
            lista = await lista.filter((el) => el.nombre.toLowerCase().includes(nombre.toLowerCase()));
            console.log(lista)
        }
        return lista;
    }

    async actualizar(id,corto,nombre,descripcion){
        const {element,index} = await this.buscar(id)
        if(element){
            element.corto=corto;
            element.nombre=nombre;
            element.descripcion=descripcion;
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


    cargarFromArray(categorias=[]){
        categorias.forEach(categoria=>{
            this.listado[categoria.id]=categoria;
        });
        
    }
}

module.exports=Categorias;