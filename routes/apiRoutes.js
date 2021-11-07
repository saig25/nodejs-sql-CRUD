const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");




// storage engine 

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    }
})

// get all users
router.get("/all", (req, res) => {
  db.user.findAll().then(users => res.send(users));
});

// get single user by id
router.get("/details/:id", (req, res) => {
    db.user.findAll({
      where: {
        user_id: req.params.id
      }
    }).then(user => res.send(user));
  });
  
  // post new user
  router.post("/insert", upload.single('user_image'), async (req, res) => {
    if (await db.user.findOne({ where: { user_email: req.body.user_email } })) {
      
      throw 'User_email "' + req.body.user_email + '" is registered';
 }

 

    const hp = await bcrypt.hash(req.body.user_password, 10)
    var i = Date.now().toString()
    if(req.file){
    
      var url =`http://localhost:3000/profile/${req.file.filename}`
    }
      else{
        var url =`http://localhost:3000/profile/default.jpg`
      }
      console.log(url)
    db.user.create({ 
        user_id: i,
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password: hp,
        user_image: url,
        total_orders: Math.floor((Math.random() * 100) + 1),
        createdAt: req.body.createdAt,
        last_login: req.body.last_login
        
    }).then(res.redirect('/home?'+ i));
    
      
  });


 
  
  // delete user
  router.delete("/delete/:id", (req, res) => {
    db.user.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => res.send("success"));
  });
  
  // edit a user
  router.put("/update", (req, res) => {
    console.log(req.body.user_name)
    db.user.update(
      {
        user_name: req.body.user_name,
        user_email: req.body.user_email
      },
      {
        where: { user_id: req.body.id }
      }
    ).then(()=> res.send('success'));
  });

  router.get('/', (req, res) =>{
    res.render('../views/register.ejs')
  })

  router.get('/home', (req, res) =>{
    var id = req.query
    res.render('../views/home.ejs', {id})
  }) 
  
  router.get('/user', (req, res) =>{
    var id = req.query
    res.render('../views/user.ejs', {id})
  })
  
  router.get('/update', (req, res) =>{
    var id = req.query
    res.render('../views/update.ejs', {id})
  })

  

module.exports = router;