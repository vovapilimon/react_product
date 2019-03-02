var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/items', function(req, res, next) {
  var data = require('../items.json');
  res.json(data);
});

router.get('/item/:id/total/:total', function(req, res, next) {
  var data = require('../items.json');
  var total = 0;
  for(let item of data){
    if(item.id == req.params.id){
      total = req.params.total * item.price;
      break;
    }
  }
  res.json({total:total});
});

module.exports = router;
