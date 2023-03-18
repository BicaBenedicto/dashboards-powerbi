const express = require('express');
const dashboardsController = require('../controllers/dashboards.controller');
const dashboardsMiddleware = require('../middlewares/dashboards.middleware');

const router = express.Router();

router.get('/', dashboardsMiddleware.get, dashboardsController.get);
router.post('/', dashboardsMiddleware.create, dashboardsController.create);
router.put('/:id', dashboardsMiddleware.update, dashboardsController.update);
router.delete('/:id', dashboardsMiddleware.remove, dashboardsController.remove);

module.exports = router;
