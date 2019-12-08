const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

module.exports = Channel = mongoose.model('channel', ChannelSchema);