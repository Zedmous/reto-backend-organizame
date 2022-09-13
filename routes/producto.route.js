const { Router } = require('express');
const { body } = require('express-validator');
const { 
    allProductos,
    createProductos,
    updateProductos, 
    deleteProductos,
    patchProductos, 
    exportProductos} = require('../controllers/producto.controller');
const { validarCampos } = require('../helpers/validar-campos');

const router = Router();
router.get(
    '/',
    allProductos);
router.get(
        '/exports',
        exportProductos);
router.post(
    '/',
    [
        body('sku', 'Ingrese un nombre corto de maximo 5 caracteres y minimo 1')
        .exists()
        .isLength({max:5}),
        body('categoria_id', 'Ingrese el id de la categoria')
        .isLength({min:1}),
        validarCampos
    ],
    createProductos)
router.put(
    '/:id',
    [
        body('sku', 'Ingrese un nombre corto de maximo 5 caracteres')
        .exists()
        .isLength({max:5}),
        body('categoria_id', 'Ingrese el id de la categoria')
        .isLength({min:1}),
        validarCampos
    ],
    updateProductos)
router.patch(
    '/',
    patchProductos)
router.delete(
    '/:id',
    deleteProductos)

module.exports = router;