const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/public', express.static('public'));

app.get('/', (req,res) => {
    res.redirect('/login');
});

app.get('/login', (req,res) => {
    res.render('login.ejs');
});

app.get('/signup', (req,res) => {
    res.render('signup.ejs');
});

app.listen(port, () => {
    console.log("Server up at " + port);
})