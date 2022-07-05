const express = require('express')
const app = express()
const cors = require('cors')

const bodyParser =  require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const db = require('./config/db')


const router = require('./routes')
app.use(cors())

const dotenv = require('dotenv')

const PORT = process.env.PORT || 1400
dotenv.config()

app.use(morgan('common'))

app.use(cookieParser())

//Config Body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Connect to DB
db.connect()

//Config routes
router(app)


// app.get('/categories', (req, res) => {
//     res.status(200).json({message: "Hello"})
// })

//Listen on port 
app.listen(PORT, () => console.log(`Service is running on port ${PORT}`))