const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoItemSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "todouser",
        required: [true, "userId required"]
    },
    content: {
        type: String,
        required: [true, 'content of item required']
    },
    start: {
        type: Boolean,
        default: false
    },
    end: {
        type: Boolean,
        default: false
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date,
    },
    duration: {
        type: Date,
        default: this.endTime - this.startTime

    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    dateOfcreated: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('item', todoItemSchema);