const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'channel'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    replies:[{
        username: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }]
});

module.exports = Message = mongoose.model('message', MessageSchema);