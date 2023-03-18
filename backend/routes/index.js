const express = require('express');

const empresasRoutes = require('./empresas.routes');
const usuariosRoutes = require('./usuarios.routes');
const dashboardsRoutes = require('./dashboards.routes');
const permissoesRoutes = require('./permissoes.routes');

const router = express.Router();

router.use('/empresas', empresasRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/dashboards', dashboardsRoutes);
router.use('/permissoes', permissoesRoutes);

module.exports = router;
