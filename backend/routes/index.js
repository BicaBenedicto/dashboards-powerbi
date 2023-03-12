const express = require('express');

const empresasRoutes = require('./empresas.routes');
const usuariosRoutes = require('./usuarios.routes');

const router = express.Router();

router.use('/empresas', empresasRoutes);
router.use('/usuarios', usuariosRoutes);

module.exports = router;
