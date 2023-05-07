const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
    userMail: {
        type: String,
        required: true,
        trim: true
    },
    friendMail: {
        type: String,
        required: true,
        trim: true,
        ref: 'User'
    }
});

const Friends = mongoose.model('Friends', FriendsSchema);
module.exports = Friends;