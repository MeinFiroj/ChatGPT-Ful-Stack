const express = require("express")

// middlewares imported
const cookieParser = require('cookie-parser')
const cors = require("cors")

// routes imported
const authRoutes = require("./routes/auth.routes")
const chatRoutes = require("./routes/chat.routes")
const messageRoutes = require('./routes/message.routes')

const app = express()

// using middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
}))


// using routes
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)




module.exports = app;