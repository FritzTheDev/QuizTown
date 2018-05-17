const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database')

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' })
        }
    })
});
// Add Score
router.post('/addscore', passport.authenticate(jwt, {session: false}), (req, res, next) => {
    const quizName = req.body.quiz;
    const username = req.body.id;
    const score = req.body.score;
    User.findById(id, (err, user) => {
        if (err) throw err;
        if (!user) {
            console.log('User Not Found')
            return res.json({ success: false, msg: 'User Not Found'});
        };
        User.quizScores.push({ quizName: quizName, score: score });
        User.save(err => {
            if (err) return handleError(err);
            console.log('Success!');
        });
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User Not Found' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 //1 week in seconds
                });
                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong Password' });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = router;
