const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
////////////////////////////////ENABLING SESSION/////////////////////////
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true
    }
}))

app.use(passport.initialize());
app.use(passport.session());
////////////////////////////////////ROUTES///////////////////////////////
app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

///////////////////////CONNECTING TO DATABASE/////////////////////////////

mongoose.connect("mongodb://localhost:27017/authentication", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("CONNECTED TO MONGODB!");
});



///////////////////////USERS/////////////////////

const userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);
//////////////////////SECRET////////////////////




///////////////////////MODEL/////////////////////
const User = mongoose.model('user', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/signup', (req, res) => {



});

///////////////////////////////AUTHENTICATING USERS////////////////////////////////////////

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/login', (req, res) => {


});

app.listen(port, () => {
    console.log("Server up at " + port);
})