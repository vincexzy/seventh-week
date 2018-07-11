var express = require('express');
var router = express.Router();

/* GET home page. */
// let num = 1;
router.get('/', function(req, res, next) {
  const session = req.session;
  if(!session.num){
    session.num = 0;
  }
  res.send("num = " + ++session.num);
});

module.exports = router;
