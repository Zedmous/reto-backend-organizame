const { response, request } = require('express');
const XLSX = require("xlsx");
const { promises: fs } = require("fs");
const path = require('path');

//instanciar el arreglo
const Productos = require('../database/producto.db')
const listProductos = new Productos();
//se requeire para validar la categoria
const { listCategorias } = require('../controllers/categoria.controller')

const allProductos = async (req = request, res = response) => {
    const { id, nombre } = req.query;
    //const query = { estado: true }
    if (id || nombre) {
        let productos = await listProductos.buscarByFiltro(id, nombre)
        const total = productos.length;
        if (productos) {
            res.status(200).json({
                total,
                productos
            })
        }
    } else {
        const productos = listProductos.listado;
        const total = productos.length;
        if (productos) {
            res.status(400).json({
                msj: "Listado de productos",
                total,
                productos
            })
        }
    }

}
const createProductos = async (req, res = response) => {
    const { sku, nombre, descripcion, precio, categoria_id } = req.body;
    const { element, index } = await listCategorias.buscar(categoria_id)
    if (!(element && index >= 0)) {// debeser a partir
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
    if (!(element && index >= 0)) {
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
    const producto = await listProductos.actualizar(id, sku, nombre, descripcion, precio, categoria_id)
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
    const eliminado = await listProductos.borrar(id)
    if (eliminado) {
        res.status(200).json({
            msj: `Producto de id: ${id} fue eliminado exitosamente`
        })
    } else {
        res.status(500).json({
            msj: `No se pudo eliminar, el id es incorrecto o no existe`
        })
    }
}
const patchProductos = (req, res) => {
    res.json({ ok: true, msj: 'patch api' })
}
const exportProductos = async (req, res) => {
    let i=0;
    let indice=[];
    let sku=[];
    let nombre_producto=[];
    let descripcion_producto=[];
    let precio=[];
    let nombre_corto_categoria=[];
    let nombre_categoria=[];
    let descripcion_categoria=[];
    const listado=listProductos.listado;
    while(i<listado.length){
        indice.push(i+1)
        sku.push(listado[i].sku)
        nombre_producto.push(listado[i].nombre)
        descripcion_producto.push(listado[i].descripcion)
        precio.push(listado[i].precio)
        let {element,index}=await listCategorias.buscar(listado[i].categoria_id)
        console.log("elemento: ",element)
        if(element){
            nombre_corto_categoria.push(element.corto)
            nombre_categoria.push(element.nombre)
            descripcion_categoria.push(element.descripcion)
        }
        i++;
    }
    let datosCSV=[];
    let fileName= 'Exports.csv';
    let data={
        '#':indice,
        'sku':sku,
        'nombre_producto':nombre_producto,
        'descripcion_producto':descripcion_producto,
        'precio':precio,
        'nombre_corto_categoria':nombre_corto_categoria,
        'nombre_categoria':nombre_categoria,
        'descripcion_categoria':descripcion_categoria,
      };
    console.log("verificando los datos",data)
    datosCSV.push(data);
    const ws =XLSX.utils.json_to_sheet(datosCSV);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
    try {
        const fullPath = path.join(__dirname, `../${fileName}`)
        if (fs.access(fullPath)){ 
            return res.sendFile(fullPath);
        }else{
            return res.status(404).json({
                ok: false,
                message: 'No se encontro el archivo'
            });
        }
    } catch ( err ){
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: 'Error al descargar el archivo',
        });
    }
}

module.exports = {
    allProductos,
    createProductos,
    updateProductos,
    deleteProductos,
    patchProductos,
    listProductos,
    exportProductos
}