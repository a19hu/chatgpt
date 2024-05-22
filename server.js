const express= require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');
const connectDB = require('./config/db');
require('dotenv').config()
const app = express();

const authRoures = require('./router/authRouter');
const errorHandler = require('./middlelware/errormiddlerware');

connectDB();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api',authRoures)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log('server running at port ' + PORT))