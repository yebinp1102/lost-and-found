const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Item } = require('../models/Item');
// ===============================
//            Item
// ===============================

const storage = multer.diskStorage({
  // destination : 파일이 저장 될 위치
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res)=> {
  upload(req, res, err => {
    if(err){
      return res.json({success: false, err})
    }
    return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
  })
})

router.post('/', (req, res)=>{
  const item = new Item(req.body)
  item.save((err)=>{
    if(err) return res.status(400).json({success: false, err})
    return res.status(200).json({success: true})
  });
})

router.post('/items', (req, res)=>{
  let order = req.body.order ? req.body.order : "desc"
  let sortBy = req.body.sortBy ? req.body.sort : "_id"
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  
  let findArgs = {}

  for(let key in req.body.filters){
    if(req.body.filters[key].length > 0){
      findArgs[key] = req.body.filters[key];
    }
  }

  Item.find(findArgs)
    .populate('writer')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, itemInfo)=>{
      if(err) return res.status(400).json({success: false, err})
      return res.status(200).json({success: true, itemInfo, postSize: itemInfo.length})
    })
})

router.get('/items_by_id', (req, res)=>{
  let type = req.query.type
  let itemId = req.query.id

  Item.find({_id: itemId})
    .populate('writer')
    .exec((err, item)=>{
      if(err) return res.status(400).json({success: false, err})
      return res.status(200).json({success: true, item})
    })

})


module.exports = router;