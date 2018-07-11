const express = require('express');
const router = express.Router();
const PW = require('png-word');
var pw = new PW();
var R = require("random-word");

const fs = require('fs');


var users ={};
var artcles = {};

router.get('/',function (req,res) {
  // console.log(req.session.user);
  res.locals.user = req.session.user || "";
  res.locals.title = req.session.title;
  res.locals.content = req.session.content;
  req.session.firstnum=res.locals.firstnum = Math.round(Math.random()*10);
  req.session.secondnum=res.locals.secondnum = Math.round(Math.random()*10);
  res.render('page');
});


router.post('/login',function (req,res) {
  const {
    id,
    password,
    num
  } = req.body;
  if (users[id] && id == users[id].id && password == users[id].password &&
  num == req.session.firstnum+req.session.secondnum ) {
    req.session.user = {
      id
    };
  }
  res.redirect('back');
});



router.post('/reg',function (req,res) {
  const {id,password,password1,vnum} =req.body;
  if (id && password && password == password1 && vnum == req.session.vimg ) {
    users[id] = {id,password};
    console.log(users);
  }
  res.redirect("back");
});



router.get('/logout',function (req,res) {
  req.session.user = undefined;
  res.redirect('back');
});


router.get('/vimg',function (req,res) {
    var r = new R("123456");
    req.session.vimg = r.random(3);
    pw.createReadStream(req.session.vimg).pipe(res);
});

router.post('/up',function (req,res) {
  // const {id} = req.session.user;
  const {title,content} = req.body;
  // artcles[id] = {id,title,content};
  req.session.title = title;
  req.session.content = content;
  res.redirect("back");
})

module.exports = router;
