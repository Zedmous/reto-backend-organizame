const { Router } = require('express');
const { 
    allProductos,
    createProductos,
    updateProductos, 
    deleteProductos,
    patchProductos } = require('../controllers/producto.controller');

const router = Router();
router.get(
    '/',
    allProductos);
router.post(
    '/',
    createProductos)
router.put(
    '/:id',
    updateProductos)
router.patch(
    '/',
    patchProductos)
router.delete(
    '/:id',
    deleteProductos)

module.exports = router;