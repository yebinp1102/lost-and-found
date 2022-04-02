const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const config = require('./config/key')
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
  .then(()=>console.log('MongoDB Connected!'))
  .catch(err=>console.log(err))

app.get('/', function (req, res) {
  res.send('Hello World')
})


// 로그인 라우트
app.post('/api/users/login', (req, res)=>{
  User.findOne({email: req.body.email}, (err, user)=>{
    if(!user){
      return res.json({loginSuccess: false, message: '존재하지 않는 회원의 이메일 입니다.'})
    }
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch)
      return res.json({loginSuccess: false, message: '비밀번호가 틀렸습니다.'})
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

// 회원가입 라우트
app.post('/api/users/register', (req, res)=>{
  const user = new User(req.body)
  user.save((err, userInfo)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).json({success: true})
  })
})

app.listen(port, ()=>console.log(`Server ${port} successfully connected!`))