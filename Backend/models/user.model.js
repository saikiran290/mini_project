let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: function () { return !this.googleId; }, // Required if not using Google
        minlength: 3
    },
    lastname: {
        type: String,
        required: function () { return !this.googleId; }
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address',
        ],
        unique: true
    },
    password: {
        type: String,
        required: function () { return !this.googleId; } // Not required for Google login
    },
    googleId: { type: String, unique: true, sparse: true }, // Store Google User ID
    profilePicture: { type: String }, // Google profile image URL
    verifyOtp: { type: String, default: '' },
    verifyOtpExpiresAt: { type: Number, default: 0 },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mailpost' }] // Reference to Mailpost
}, { timestamps: true });

let user = mongoose.model('user', userSchema);
module.exports = user;
