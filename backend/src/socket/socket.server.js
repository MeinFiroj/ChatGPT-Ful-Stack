const { Server } = require("socket.io");
const aiServices = require("../services/ai.service");
const messageModel = require("../models/message.model");
const userModel = require("../models/user.model");
const Cookie = require("cookie")
const jwt = require('jsonwebtoken');
const vectorServices = require("../services/vectors.service")

function initSocketServer(httpServer) {

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials :true,
            methods : ["GET", "POST"]
        }
    });

    io.use(async (socket, next) => {
        const cookie = Cookie.parse(socket.handshake.headers?.cookie || "")
        if (!cookie.token) {
            next(new Error("Unauthorized, token not found"))
        }

        try {
            const decoded = jwt.verify(cookie.token, process.env.JWT_SECRET)
            const user = await userModel.findById(decoded.id)
            socket.user = user
            next()
        } catch (error) {
            next(new Error('Unauthorized, Invalid token'))
        }
    })

    io.on("connection", (socket) => {
        console.log("New socket connected : ", socket.id)

        socket.on("disconnect", ()=>{
            console.log("Socket disconnected")
        })

        socket.on("ai-message", async (data) => {
            const [storedMessage, msgVectors] = await Promise.all([
                messageModel.create({
                    content: data.message,
                    role: "user",
                    chat: data.chat,
                    user: socket.user._id
                }),
                aiServices.generateVectors(data.message)
            ])

            const [queryResult, chatHistory] = await Promise.all([
                vectorServices.queryMemory({
                    vectors: msgVectors,
                    limit: 3,
                    metadata: {
                        user: socket.user._id
                    }
                }),
                messageModel.find({ chat: data.chat })
                    .sort({ createdAt: -1 })
                    .limit(10).lean()
                    .then((c) => c.reverse()),

                vectorServices.createMemory({
                    messageId: storedMessage._id,
                    vectors: msgVectors,
                    metadata: {
                        text: data.message,
                        chat: data.chat,
                        user: socket.user._id
                    }
                })
            ])

            const stm = chatHistory.map(item => {
                return {
                    role: item.role,
                    parts: [{ text: item.content }]
                }
            })

            const ltm = [
                {
                    role: 'user',
                    parts: [{
                        text: `
                        Here are some context that might be useful :
                    ${queryResult.map(item => item.metadata.text).join('\n')}
                    `}]
                }
            ]

            const response = await aiServices.generateResponse([...ltm, ...stm])

            socket.emit('ai-response', {
                message : response
            })

            const [responseVectors, storedResponse] = await Promise.all([
                aiServices.generateVectors(response),
                messageModel.create({
                    content: response,
                    role: "model",
                    chat: data.chat,
                    user: socket.user._id
                })
            ])

            await vectorServices.createMemory({
                messageId: storedResponse._id,
                vectors: responseVectors,
                metadata: {
                    text: response,
                    chat: data.chat,
                    user: socket.user._id
                }
            })
        })
    });
}

module.exports = initSocketServer