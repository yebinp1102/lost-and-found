const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require('./models/User')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const config = require('./config/key')
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
  .then(()=>console.log('MongoDB Connected!'))
  .catch(err=>console.log(err))

app.get('/', function (req, res) {
  res.send('Hello World')
})

// 회원가입 라우트
app.post('/api/user/register', (req, res)=>{
  const user = new User(req.body)
  user.save((err, userInfo)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({success: true})
  })
})

app.listen(port, ()=>console.log(`Server ${port} successfully connected!`))