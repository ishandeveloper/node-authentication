const express=require('express');
const bodyParser=require('body-parser');

const app=express();

app.use('view engine','ejs');
app.use(bodyParser.urlencoded());
