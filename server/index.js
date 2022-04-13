const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/User')
const { auth } = require('../middleware/auth') 
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const config = require('./config/key')
const mongoose = require('mongoose');
const { Item } = require('./models/Item')
mongoose.connect(config.mongoURI)
  .then(()=>console.log('MongoDB Connected!'))
  .catch(err=>console.log(err))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use(cors())
app.use('/api/item', require('./routes/item'));
app.use('/uploads', express.static('uploads'));

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

// auth 라우트
app.get('/api/users/auth', auth, (req, res)=>{
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    list: req.user.list
  })
})

// 로그아웃 라우트
app.get('/api/users/logout', auth, (req, res)=>{
  User.findOneAndUpdate({_id: req.user._id}, { token: ""}, (err,user)=>{
    if(err) return res.json({success: false, err});
    return res.status(200).send({success: true})
  })
})

app.post('/api/users/addToCart', auth, (req, res)=>{
  // DB의 User collection에서 해당 유저의 정보를 가져온다.
  User.findOne({_id: req.user._id},
    (err, userInfo)=>{
      let duplicate = false;
      userInfo.list.forEach((item)=>{
        // 가져온 정보에서 관심 목록에 추가할 물건이 이미 목록에 있는지 확인
        if(item.id === req.body.itemId){
          duplicate = true;
        }
      })
      // 물건이 이미 리스트에 있을 때
      if(duplicate){
        let alert = '이미 관심 목록에 있는 물건 입니다.'
        return res.status(200).json({alert})
      }else{   // 물건이 리스트에 없을 때, 상품 정보(id, 날짜 정보) 모두 리스트에 저장.
        User.findOneAndUpdate(
          {_id: req.user._id},
          {
            $push: {
              list: {
                id: req.body.itemId,
                date: Date.now()
              }
            }
          },
          { new: true },
          (err, userInfo) => {
            if(err) return res.status(400).send(err)
            return res.status(200).send(userInfo.list)
          }
        )
      }

    }
  )
})

app.get('/api/users/removeFromList', auth, (req, res)=>{
  User.findOneAndUpdate(
    {_id: req.user._id},
    {
      "$pull" : { "list" : {"id" : req.query.id} }
    },
    { new: true },
    (err, userInfo)=>{
      let list = userInfo.list;
      let array = list.map(item=>{
        return item.id
      })
      Item.find({_id: { $in: array}})
        .populate('writer')
        .exec((err, ItemInfo)=>{
          if(err) return res.status(400).send(err)
          return res.status(200).json({
            ItemInfo,
            list
          })
        })
    }
  )
})

app.listen(port, ()=>console.log(`Server ${port} successfully connected!`))