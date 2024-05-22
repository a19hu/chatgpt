const express= require('express');
const { registercontroller, logoutcontoller, logincontroller } = require('../controller/authcontroller');

const router = express.Router();


router.post('/register',registercontroller)
router.post('/login', logincontroller)
router.post('/logout', logoutcontoller)




module.exports = router