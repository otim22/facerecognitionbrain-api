const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

var dbConnect = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'fredrickotim',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', signin.handleSignin(dbConnect, bcrypt))

app.post('/register', (req, res) => {
    register.handleRegister(req, res, dbConnect, bcrypt)
})

app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, dbConnect)
})

app.put('/image', (req, res) => {
    image.handleImage(req, res, dbConnect)
})

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running! on port ${process.env.PORT}`)
})
