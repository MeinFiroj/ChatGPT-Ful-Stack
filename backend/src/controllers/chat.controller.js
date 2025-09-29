const chatModel = require("../models/chat.model")
const { generateChatTitle } = require("../services/ai.service")


async function create(req,res) {
    const message = req.body.title
    const user = req.user

    if(message.trim() === ""){
        return res.status(400).json({message : "Title must not empty"})
    }

    const title = await generateChatTitle(message)

    const chat = await chatModel.create({
        user : user._id,
        title
    })

    res.status(201).json({
        message : "Chat created successfully",
        chat : {
            id : chat._id,
            title : chat.title,
            user : chat.user
        }
    })
}

async function readChats(req, res) {
    
    const chats = await chatModel.find({user : req.user._id}).select('_id title createdAt').sort({createdAt:-1}).lean()

    res.status(200).json({
        chats
    })
}

module.exports = {
    create, readChats
}