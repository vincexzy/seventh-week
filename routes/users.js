var express = require('express');
var router = express.Router();
// var PW = require("png-word");
// var pw = new PW();
// var R = require("random-word");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals.user = req.session.user || "";

  req.session.firstnum = res.locals.firstnum = Math.round(Math.random() * 10);
  req.session.secondnum = res.locals.secondnum = Math.round(Math.random() * 10);
  res.render("user");
});

router.get("/logout", function(req, res) {
  req.session.user = undefined;
  res.redirect("back");
});

var users = {}

router.post("/login", function(req, res) {
  const {
    loginname,
    password,
    vnum
  } = req.body;
  console.log(Number(vnum), req.session.firstnum, req.session.secondnum)
  if (
    Number(vnum) === req.session.firstnum + req.session.secondnum &&
    users[loginname] &&
    users[loginname].password === password) {
    req.session.user = {
      loginname
    }
  }
  res.redirect("back");
});


router.post("/reg", function(req, res) {
  const {
    loginname,
    password,
    confirm,
    vimg
  } = req.body;
  if (req.session.vimg === vimg
    && loginname && password && password === confirm) {
    users[loginname] = {
      loginname,
      password
    };
  }
  res.redirect("back");
})



router.get("/vimg", function(req, res) {
  var r = new R("123456");
  req.session.vimg = r.random(3);
  pw.createReadStream(req.session.vimg).pipe(res);
})

function manager(req,res,next){
  if(req.session.user && req.session.user.loginname === "admin"){
    next();
  }else{
    next(new Error("你没权限更改密码！"));
  }
}

router.post("/update_pwd",manager,function (req,res) {
  const {loginname , new_password} = req.body;
  if(users[loginname]){
    users[loginname].password = new_password;
  }
  res.redirect("back");
})

module.exports = router;
