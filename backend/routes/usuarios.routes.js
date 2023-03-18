const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');
const usuariosMiddleware = require('../middlewares/usuarios.middleware');

const router = express.Router();

router.post('/login', usuariosMiddleware.login, usuariosController.login);
router.get('/', usuariosMiddleware.get, usuariosController.get);
router.post('/', usuariosMiddleware.create, usuariosController.create);
router.post('/', usuariosMiddleware.create, usuariosController.create);
router.put('/:id', usuariosMiddleware.update, usuariosController.update);
router.delete('/:id', usuariosMiddleware.remove, usuariosController.remove);

module.exports = router;
