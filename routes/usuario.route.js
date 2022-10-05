const { Router } = require('express');
const {
    loginUsuario, enviarFechas } = require('../controllers/usuario.controller');

const router = Router();

router.post(
    '/',
    loginUsuario)

router.post(
    '/folios',
    enviarFechas)
module.exports = router;