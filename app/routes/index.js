var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 補充課程：Sass 與 includePaths
router.get('/post', function(req, res, next) {
  res.render('post', { title: 'Express' });
});









module.exports = router;
