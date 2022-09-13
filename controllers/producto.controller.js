const { response, request } = require('express');
//instanciar el arreglo
const Productos = require('../database/producto.db')
const listProductos = new Productos();
//se requeire para validar la categoria
const { listCategorias } = require('../controllers/categoria.controller')

const allProductos = async (req=request, res = response) => {
    const { id , nombre } = req.query;
    //const query = { estado: true }
    if(id || nombre){
        let productos= await listProductos.buscarByFiltro(id,nombre)
        const total=productos.length;
        if(productos){
            res.status(200).json({
                total,
                productos
            })
        }
    }else{
        const productos = listProductos.listado;
        const total = productos.length;
        if(productos){
            res.status(400).json({
                msj:"Listado de productos",
                total,
                productos
            })
        }
    }
    
}
const createProductos = async (req, res = response) => {
    const { sku, nombre, descripcion, precio, categoria_id } = req.body;
    const { element, index } = await listCategorias.buscar(categoria_id)
    if (!(element && index>=0)) {// debeser a partir
        res.status(400).json({
            msj: `El id de la categoria ${categoria_id} no existe o es incorrecto`
        })
    }
    const enc = await listProductos.buscarBySKU(sku);
    if (enc) {
        res.status(400).json({
            msj: `SKU ya se encuentra en uso`
        })
    } else {
        const producto = await listProductos.crear(sku, nombre, descripcion, precio, categoria_id)
        res.json({
            msj: "create",
            producto
        })
    }
}
const updateProductos = async (req, res) => {
    const id = req.params.id;
    const { sku, nombre, descripcion, precio, categoria_id } = req.body;
    const { element, index } = await listCategorias.buscar(categoria_id)
    if (!(element && index>=0)) {
        res.status(400).json({
            msj: `El id de la categoria ${categoria_id} no existe`
        })
    }
    const enc = await listProductos.buscarBySKU(sku);
    if (enc) {// si existe
        if (!(enc.id == id)) {// si no es el mismo id entonces no puede actualizar el sku
            res.status(400).json({
                msj: `El SKU del producto ${sku} ya esta en uso`
            })
        }
    }
    const producto = await listProductos.actualizar(id,sku, nombre, descripcion, precio, categoria_id)
    if (producto) {
        res.status(200).json({
            msj: `Producto fue actualizado exitosamente`,
            producto
        })
    } else {
        res.status(400).json({
            msj: `No se pudo actualizar, el id del producto no existe o es incorrecto`
        })
    }
}
const deleteProductos = async (req, res) => {
    const { id } = req.params;
    const eliminado=await listProductos.borrar(id)
    if(eliminado){
        res.status(200).json({
            msj:`Producto de id: ${id} fue eliminado exitosamente`
        })
    }else{
        res.status(500).json({
            msj:`No se pudo eliminar, el id es incorrecto o no existe`
        })
    }
}
const patchProductos = (req, res) => {
    res.json({ ok: true, msj: 'patch api' })
}
module.exports = {
    allProductos,
    createProductos,
    updateProductos,
    deleteProductos,
    patchProductos,
    listProductos
}