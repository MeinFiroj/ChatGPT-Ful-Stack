const express = require("express")
const authControllers = require('../controllers/auth.controller')
const authMiddlware = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/register', authControllers.register)
router.post('/login', authControllers.login)
router.get('/verifyuser', authMiddlware.authUser, authControllers.verifyUser)



module.exports = router;