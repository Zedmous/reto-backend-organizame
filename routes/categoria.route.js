const { Router } = require('express');
const { body } = require('express-validator');
const { 
    allCategorias,
    createCategorias,
    updateCategorias, 
    deleteCategorias,
    patchCategorias } = require('../controllers/categoria.controller');
const { validarCampos } = require('../helpers/validar-campos');
const router = Router();
router.get(
    '/',
    allCategorias);
router.post(
    '/',
    [
        body('corto', 'Ingrese un nombre corto de maximo 5 caracteres y minimo 1')
        .exists()
        .isLength({max:5}),
        validarCampos
    ],
    createCategorias)
router.put(
    '/:id',
    [
        body('corto', 'Ingrese un nombre corto de maximo 5 caracteres y minimo 1')
        .exists()
        .isLength({max:5}),
        validarCampos
    ],
    updateCategorias)
router.patch(
    '/',
    patchCategorias)
router.delete(
    '/:id',
    deleteCategorias)

module.exports = router;