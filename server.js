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
    host : process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res)=>{res.json(`it is working!`)})

app.post('/signin', (req, res)=>{signin.handleSignIn(req,res, db, bcrypt)})

app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)})

app.put('/image', (req, res) => {image.handleImageUpload(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req, res, db)})

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`app is running on port ${process.env.PORT}`)
})
