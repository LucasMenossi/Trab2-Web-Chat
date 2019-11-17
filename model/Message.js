const mongoose = require("mongoose")
const MessageSchema = new mongoose.Schema({
    send: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    video: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Message", MessageSchema)