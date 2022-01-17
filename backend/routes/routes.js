const bcrypt = require('bcryptjs')
// const User = require('../module/UserStudent')
const { Router } = require('express');
const User = require('../module/user')
const authController = require('../middleware/authControllers');
const router = Router();
const jwt = require("jsonwebtoken");

// const {requireLogin}  = require('../middleware/auth');
// router.get('/', requireLogin , async (req, res) => {
//     // console.log(req.user);
//     try {
//         const user = await User.findById(req.user._id).select("-password -__v");
//         res.json(user);
//     } catch (error) {
//         return res.status(400).json({ error: error.message });
//     }
// })

// router.post('/UserRegister', authController.registerUser)
// router.post('/Userlogin', authController.loginUser)

router.post('/Register', authController.register)
router.post('/login', authController.login)
router.get('/verifyuser', authController.verifyuser)
router.post('/shopDetails', authController.shopkeeper)
router.get('/shops', authController.shops)
router.get('/shopfilter', authController.shopfilterer)
router.get('/:id', authController.singleShop)

// router.post('/BecomeTutor', authController.BecomeTutor)
// router.post('/ShopkeeperRegister', authController.registerShopkeeper)
// router.post('/Shopkeeperlogin', authController.loginShopkeeper)
// router.get('/logout', authController.logout)
// router.get('/Student', authController.Student)
// router.get('/data', authController.data)


module.exports = router;

