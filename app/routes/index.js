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

// 檔案頁面
router.get('/dashboard/archives', function(req, res, next) {
  res.render('dashboard/archives', { title: 'Express' });
});

// 文章頁面
router.get('/dashboard/article', function(req, res, next) {
  res.render('dashboard/article', { title: 'Express' });
});

// 分類頁面
router.get('/dashboard/categories', function(req, res, next) {
  res.render('dashboard/categories', { title: 'Express' });
});

// 分類頁面
router.get('/dashboard/categories', function(req, res, next) {
  res.render('dashboard/categories', { title: 'Express' });
});

// 註冊頁面
router.get('/dashboard/signup', function(req, res, next) {
  res.render('dashboard/signup', { title: 'Express' });
});








module.exports = router;
