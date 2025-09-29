const messageModel = require("../models/message.model")

async function getMessages(req,res) {
   const id = req.query.id
    const messages = (await messageModel.find({
        user : req.user._id,
        chat : id
    }).select('content role createdAt').sort({createdAt : 1}).lean());

    res.status(200).json({
        messages
    })
    
}


module.exports = {getMessages}