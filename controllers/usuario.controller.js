const { response } = require('express');
const Usuarios=require('../database/usuario.db')
let listUsuarios = new Usuarios();
listUsuarios.crear('admin','4321')
listUsuarios.crear('user','1234')

const loginUsuario = async (req, res) => {
    
    const { username,password } = req.body;
    try {
       
        const usuario = await listUsuarios.login(username,password);
        if(!usuario){
            res.status(400).json({
                msj:"Usuario o contraseña son incorrectos"
            })
        }else{
            res.status(201).json({
                msj:"Login exitoso",
                usuario
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msj:"Hable con el administrador"
        })
    }
}

module.exports = {
    loginUsuario,
}