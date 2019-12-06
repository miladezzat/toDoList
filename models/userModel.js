const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: {
        type: String,
        minlength: [2, 'Full Name must be at least 2 characters'],
        maxlength: [50, 'Full Name must be most 50 characters'],
        required: [true, "Full Name was required"]
    },
    userName: {
        type: String,
        required: [true, 'Username was required'],
        unique: [true, "Username must be unique"],
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [50, 'Username must be most 50 characters']
    },
    password: {
        type: String,
        required: [true, "Password Required"],
        minlength: [6, "Password must be at least 6 character"],
        maxlength: [50, 'Password must be most 50 characters']
    },
    avatar: {
        type: String,
        default: "/uploads/user.png"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    dateRegister: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('todouser', userSchema);