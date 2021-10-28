const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000
const app = express()

app.set('views', __dirname + `/views`)
app.set('view engine', 'pug')

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    }),
)

app.use(express.static(__dirname + '/public'))

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

module.exports = app
