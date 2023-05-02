const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    userMailSendMessage: {
        type: String,
        required: true,
        trim: true
    },
    userMailGetMessage: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    messageTime: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;