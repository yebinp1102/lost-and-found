const express = require('express')
const app = express()
const port = 5000


const config = require('./config/key')
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
  .then(()=>console.log('MongoDB Connected!'))
  .catch(err=>console.log(err))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, ()=>console.log(`Server ${port} successfully connected!`))