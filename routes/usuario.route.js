const { Router } = require('express');
const {
    loginUsuario } = require('../controllers/usuario.controller');

const router = Router();

router.post(
    '/',
    loginUsuario)


module.exports = router;