require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const path = require('path')
const chalk = require('chalk')
const passport = require('passport')
const flash = require('connect-flash')
const cors = require('cors')
const cookieSession = require('cookie-session')

// --- DATABASE CONFIGURATION
require('./configs/db.config')

// --- EXPRESS ---
const app = express()

// --- PORT ---
const PORT = process.env.PORT || 3000

// --- MIDDLEWARE SETUP ---
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())
app.set('trust proxy', 1)
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    sameSite: 'none',
    secure: true
}))

// --- CORS MIDDLEWARE ---
app.use(cors({
    origin: ["http://localhost:3001"]
}))

// --- SESSION CONFIGURATION ---
app.use(session ({
    secret: `${process.env.DATABASE}`,
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: 'none',
        secure: true
    }
}))

// --- PASSPORT CONFIGURATION ---
require('./configs/passport.config')

// --- MIDDLEWARE PASSPORT ---
app.use(passport.initialize())
app.use(passport.session())

// --- ROUTES ---
const index = require('./routes/index.routes')
app.use('/', index)
const client = require('./routes/client.routes')
app.use('/client', client)

// --- ERROR ROUTES ---
app.use((req, res, next) => {
    res.status(400)
    res.send('not-found')
})
app.use((err, req, next) => {
    if(!res.headersSent) {
        res.status(500)
        res.send('error')
    }
})

// --- LISTEN ---
app.listen(PORT, () => {
    console.log(chalk.blue.inverse.bold('conectado'))
})