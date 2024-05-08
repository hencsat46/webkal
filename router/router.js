const express = require('express')
const methods = require('methods')
const path = require('path')
const router = express.Router()
const cors = require('cors')
const cookie = require('cookie-parser')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const mongo = require('mongoose')

const app = express()
app.use(express.json())
app.use(cookie(process.env.cookie_secret))
dotenv.config()
mongo.connect(process.env.mongo_url, {useNewUrlParser: true})
const db = mongo.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to mongodb"))

authCors = {
    origin: 'http://localhost:3000/login',
    origin: 'http://localhost:3000/signup',
    methods: 'POST',
}

mainCors = {
    origin: 'http://localhost:3000/',
    methods: 'GET',
}

router.get('/', (req, res) => {
    
    
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/login_handler', cors(authCors), async (req, res) => {
    
    const password = req.body.password

    const result = await db.collection('users').findOne({username: req.body.username})
    
    if (password == result.password) {
        const token = generateToken(req.body.username)
        res.cookie('token', token)
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }

})

router.post('/signup_handler', cors(authCors), async (req, res) => {
    const body = req.body
    const data = {
        username: body.username,
        password: body.password,
    }

    const count = await db.collection('users').countDocuments({username: data.username})
    
    if (count > 0) {
        return res.sendStatus(400)
    }
    
    const result = await db.collection('users').insertOne(data)
    console.log(result)
    res.sendStatus(200)

})

router.get('/auth', cors(mainCors), (req, res) => {
    
    const token = req.headers['token']
    if (token == '') 
        return res.sendStatus(401)
    else {
        jwt.verify(token, process.env.jwt_secret, (err, user) => {
            console.log(err)
            if (err) return res.sendStatus(403)
            res.sendStatus(200)
        })
    }
    
})

function generateToken(username) {
    return jwt.sign({username: username}, process.env.jwt_secret, {expiresIn:'1800s'})
}

module.exports = router


// const authHeader = req.headers['token']
//     const token = authHeader
//     if (token == null) 
//         return res.sendStatus(401)
//     jwt.verify(token, process.env.jwt_secret, (err, user) => {
//         console.log(err)
//         if (err) return res.sendStatus(403)
//     })
    