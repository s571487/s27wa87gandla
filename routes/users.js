var express = require('express');
var router = express.Router();

var product = 1;
var factor = 1;

/* GET users listing. */
router.get('/', function(req, res, next) {
  factor++;
  product *= factor;
  res.send(`Product is: ${product}`);
});

module.exports = router;
