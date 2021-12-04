const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')

dotenv.config();
mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log("Connected")
})


const Port = process.env.Port || 3000;

app.listen(Port, ()=>console.log("Server started"))