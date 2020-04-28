const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        const newUser = User({
            username: req.body.username,
            password: hash
        });

        newUser.save((e) => {
            if (!e) {
                res.render('secrets.ejs');
            } else {
                console.log(e);
            }
        });
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
        if (!e) {
            bcrypt.compare(pass,matchedUser.password,(e,result)=>{
                if(!e){
                    if(result){
                        res.render('secrets.ejs');
                    }
                    else{
                        res.redirect('/login');
                    }
                }
            });
        } else {
            console.log(e);
        }
    });

});

app.listen(port, () => {
    console.log("Server up at " + port);
})