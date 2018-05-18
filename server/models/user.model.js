const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const config = require('../config/database')

const Schema = mongoose.Schema;
//quizScores Schema
const QuizScoreSchema = new Schema({
    quizName: {type: String, required: true},
    score: {type: Number, required: true}
});
const UpgradeSchema = new Schema({
    upgrade: {type: String, required: true }
});

//User Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    quizScores: [QuizScoreSchema],
    upgrades: [UpgradeSchema],
    quizBucks: {
        type: Number,
        default: 0,
        required: true,
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}
