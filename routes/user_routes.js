const Router = require('express');
const {home,userSignup,userLogin,userAuth,userDash,userLogout} = require('../controllers/user_controller.js')

const router = Router();

router.get('/signup',home);
router.post('/signup',userSignup);
router.get('/login',userLogin);
router.post('/login',userAuth);
router.get('/dashboard',userDash);
router.get('/logout',userLogout);


module.exports = router;