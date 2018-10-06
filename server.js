const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

var dbConnect = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/', (req, res) => {
    res.send('It workings!');
})

app.post('/signin', signin.signinAuthentication(dbConnect, bcrypt))

app.post('/register', (req, res) => {
    register.handleRegister(req, res, dbConnect, bcrypt)
})

app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, dbConnect)
})

app.post('/profile/:id', (req, res) => {
    profile.handleProfileUpdate(req, res, dbConnect)
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
