const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('Connected to DB ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('DB Error ' + err);
});

const app = express();

const users = require('./routes/user.routes');

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/user', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log('Server Started on Port ' + port);
});