const { response } = require('express');
const moment = require('moment');
const axios = require('axios');
const Usuarios = require('../database/usuario.db')
let listUsuarios = new Usuarios();
listUsuarios.crear('admin', '4321')
listUsuarios.crear('user', '1234')

const loginUsuario = async (req, res) => {

    const { username, password } = req.body;
    try {

        const usuario = await listUsuarios.login(username, password);
        if (!usuario) {
            res.status(400).json({
                msj: "Usuario o contraseña son incorrectos"
            })
        } else {
            res.status(201).json({
                msj: "Login exitoso",
                usuario
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msj: "Hable con el administrador"
        })
    }
}



const enviarFechas = async (req, res) => {

    let { fecha_inicio, fecha_final, instance_id } = req.body;
    fecha1 = fecha_inicio
    fecha2 = fecha_final
    let startDate = moment(fecha1);//fecha inicial de la semana
    let endDate = moment(fecha2)//fecha final de la semana
    let diffDays = endDate.diff(startDate, 'days', true)
    let numberDays = Math.round(diffDays);
    const arrayDays = Object.keys([...Array(numberDays + 1)]).map((a) => {
        a = parseInt(a);
        let dayObject = moment(startDate).clone().add(a, "d");
        return {
            date: dayObject.format('YYYY-MM-DD'),
        };
    });
    let i = 0;
    while (arrayDays[i]) {
        const data=await axios.post('http://localhost:3120/consumo_folio', {
            instance_id: instance_id,
            fecha_aux: arrayDays[i].date
        }).catch(function (error) {
            console.log(error);
        });

        if(data){
            console.log(data.data)
        }
        i++;
    }
    res.json({ msj: "OK" })

}

module.exports = {
    loginUsuario,
    enviarFechas
}