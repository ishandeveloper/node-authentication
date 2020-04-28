const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const md5 = require('md5');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/public', express.static('public'));
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

//////////////////////SECRET////////////////////





///////////////////////MODEL/////////////////////
const User = mongoose.model('user', userSchema);

app.post('/signup', (req, res) => {
    const newUser = User({
        username: req.body.username,
        password: md5(req.body.password)
    });

    newUser.save((e) => {
        if (!e) {
            res.render('secrets.ejs');
        } else {
            console.log(e);
        }
    });

});

///////////////////////////////AUTHENTICATING USERS////////////////////////////////////////

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/login', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;

    User.findOne({
        username: user
    }, (e, matchedUser) => {
        if (matchedUser.password == md5(pass)) {
            res.render('secrets.ejs');
        } else {
            console.log("ERROR");
        }
    });

});

app.listen(port, () => {
    console.log("Server up at " + port);
})