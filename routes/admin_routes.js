const Router = require('express');
const {adminLogin,adminAuth,adminDash} = require('../controllers/admin_controller.js')

const adminRouter = Router();

adminRouter.get('/login',adminLogin);
adminRouter.post('/login',adminAuth);
adminRouter.get('/dashboard',adminDash);

module.exports = adminRouter;