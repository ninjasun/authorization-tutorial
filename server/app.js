require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const port = 3000
const app = express()
const {verify} = require('./middleware')
const {login, refresh} = require('./authentication')

app.use(bodyParser.json())
app.use(cookieParser())

//app.get('/comments', verify, routeHandler)
app.post('/login', login)
app.post('/refrsh', refresh)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})