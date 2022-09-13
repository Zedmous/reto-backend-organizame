const { response } = require('express');
const Categorias=require('../database/categoria.db')
const listCategorias = new Categorias();

const allCategorias = async (req, res = response) => {
    const { id , nombre } = req.query;
    if(id || nombre){
        let categorias= await listCategorias.buscarByFiltro(id,nombre)
        const total=categorias.length;
        if(categorias){
            res.status(200).json({
                total,
                categorias
            })
        }
    }else{
        const categorias= listCategorias.listado;
        const total=categorias.length;
        if(categorias){
            res.status(200).json({
                total,
                categorias
            })
        }
    } 
    
    
}
const createCategorias = async (req, res = response) => {
    const { corto,nombre, descripcion } = req.body;
    const enc= await listCategorias.buscarByCorto(corto);
    if(enc){
        res.status(400).json({
            msj:`Nombre corto ya se encuentra en uso`
        })
    }else{
        const categoria= await listCategorias.crear(corto,nombre, descripcion)
        res.json({
            msj:"create",
            categoria
        })
    }
    
}
const updateCategorias = async (req, res) => {
    const id = req.params.id;
    const { corto,nombre, descripcion } = req.body;
    const enc = await listCategorias.buscarByCorto(corto);
    if (enc) {// si existe
        if (!(enc.id == id)) {// si no es el mismo id entonces no puede actualizar el nombre corto
            res.status(400).json({
                msj: `El nombre corto de la categoria ${corto} ya esta en uso`
            })
        }
    }
    const categoria=await listCategorias.actualizar(id,corto,nombre, descripcion)
    if(categoria){
        res.status(200).json({
            msj:`Categoria de id: ${id} fue actualizado exitosamente`,
            categoria
        })
    }else{
        res.status(400).json({
            msj:`No se pudo actualizar, el id es incorrecto`
        })
    }
}
const deleteCategorias = async (req, res) => {
    const { id } = req.params;
    const eliminado=await listCategorias.borrar(id)
    if(eliminado){
        res.status(200).json({
            msj:`Categoria de id: ${id} fue eliminado exitosamente`
        })
    }else{
        res.status(500).json({
            msj:`No se pudo eliminar, el id es incorrecto`
        })
    }
    
}
const patchCategorias = (req, res) => {
    res.json({ ok: true, msj: 'patch api' })
}
module.exports = {
    allCategorias,
    createCategorias,
    updateCategorias,
    deleteCategorias,
    patchCategorias,
    listCategorias
}