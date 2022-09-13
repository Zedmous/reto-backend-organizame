const { Router } = require('express');
const { 
    allCategorias,
    createCategorias,
    updateCategorias, 
    deleteCategorias,
    patchCategorias } = require('../controllers/categoria.controller');
const router = Router();
router.get(
    '/',
    allCategorias);
router.post(
    '/',
    createCategorias)
router.put(
    '/:id',
    updateCategorias)
router.patch(
    '/',
    patchCategorias)
router.delete(
    '/:id',
    deleteCategorias)

module.exports = router;