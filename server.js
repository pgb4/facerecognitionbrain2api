const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const profile = require('./controllers/profile')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '4Postgres45??',
    database : 'smart_brain2'
  }
});

const app = express();

app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res)=>{res.json(database.users)})

app.post('/signin', (req, res)=>{signin.handleSignIn(req,res, db, bcrypt)})

app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)})

app.put('/image', (req, res) => {image.handleImageUpload(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req, res, db)})

app.listen(3001, ()=>{
  console.log(`app is running on port 3001`)
})
