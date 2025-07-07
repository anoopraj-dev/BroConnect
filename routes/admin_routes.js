const Router = require('express');
const {adminLogin} = require('../controllers/admin_controller.js')

const adminRouter = Router();

adminRouter.get('/login',adminLogin)

module.exports = adminRouter;