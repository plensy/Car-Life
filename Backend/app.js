var express = require('express');
var app = express();
var UserController = require('./User/UserController');
var AuthController = require('./User/auth');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var passport = require('passport');
var cookieParser = require('cookie-parser');


app.options('*', cors());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname, '/dist/Frontend')));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/api/user', UserController);
app.use('/auth', AuthController);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/Frontend/index.html'));
});

app.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = app;
