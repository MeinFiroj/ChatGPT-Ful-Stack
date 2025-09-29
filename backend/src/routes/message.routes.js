const express = require("express")
const authMiddlewares = require('../middlewares/auth.middleware')
const messageControllers = require("../controllers/message.controller")

const router = express.Router()

router.get('/messages', authMiddlewares.authUser, messageControllers.getMessages)




module.exports = router;