const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        enum : ['user', 'model', 'system'],
        default : 'user'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required: true
    },
    chat : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "chats",
        required : true
    },
}, {timestamps: true})

const messageModel = mongoose.model('messages', messageSchema)

module.exports = messageModel;
