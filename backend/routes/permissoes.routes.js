const express = require('express');
const permissoesController = require('../controllers/permissoes.controller');
const permissoesMiddleware = require('../middlewares/permissoes.middleware');

const router = express.Router();

router.get('/', permissoesMiddleware.get, permissoesController.get);
router.post('/', permissoesMiddleware.create, permissoesController.create);
router.put('/:id', permissoesMiddleware.update, permissoesController.update);
router.delete('/:id', permissoesMiddleware.remove, permissoesController.remove);

module.exports = router;
