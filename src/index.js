const express = require('express')
const bodyParser =  require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const db = require('./config/db')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const router = require('./routes')
const app = express()
const PORT = process.env.PORT || 3000 

app.use(morgan('common'))
app.use(cors())

app.use(cookieParser())

//Config Body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Connect to DB
db.connect()

//Config routes
router(app)


//Listen on port 
app.listen(PORT, () => console.log(`Service is running on port ${PORT}`))