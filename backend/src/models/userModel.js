const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true,
        min: 6,
        max: 100
    },
    age: {
        required: true,
        type: Number
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user_collection', dataSchema)