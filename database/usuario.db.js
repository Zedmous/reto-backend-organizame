const Usuario=require("../models/usuario.model")
class Usuarios{
    listado=[];
    get listado(){
        return this.listado;
    }
    constructor(){
        this.listado=[];
    }
    crear(username,password){
        const usuario=new Usuario(username,password)
        this.listado.push(usuario);
        return usuario;
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
    async login(username="",password=""){
        const usuario = await this.listado.find((element) => {
            if(element.username==username && element.password==password){
                return true;
            }
        })
        if(usuario){
            return usuario;
        }else{
            return false;
        }
    }
    
    async actualizar(id,username,password){
        const {element,index} = await this.buscar(id)
        if(element){
            element.username=username;
            element.password=password;
            this.listado[index]=element;
        }
        if(index){
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
}

module.exports=Usuarios;