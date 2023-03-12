const express = require('express');
const empresasController = require('../controllers/empresas.controller');
const empresasMiddleware = require('../middlewares/empresas.middleware');

const router = express.Router();

router.get('/', empresasMiddleware.get, empresasController.get);
router.post('/', empresasMiddleware.create, empresasController.create);
router.put('/:id', empresasMiddleware.update, empresasController.update);
router.delete('/:id', empresasMiddleware.remove, empresasController.remove);

module.exports = router;
