const express =require("express")
const chatControllers = require('../controllers/chat.controller')
const authMiddlewares = require("../middlewares/auth.middleware")

const router = express.Router()

router.post('/', authMiddlewares.authUser ,chatControllers.create)
router.get('/', authMiddlewares.authUser, chatControllers.readChats)




module.exports = router