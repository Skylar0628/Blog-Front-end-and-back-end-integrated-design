var express = require('express');
var router = express.Router();
const { db,adminAuth} = require('../connections/firebase_admin_connect');

const categoriesRef = db.ref('categories'); //分類路徑

// 檔案頁面
router.get('/archives', function(req, res, next) {
  res.render('dashboard/archives', { title: 'Express' });
});

// 文章頁面
router.get('/article', function(req, res, next) {
  res.render('dashboard/article', { title: 'Express' });
});

// 分類頁面
router.get('/categories', function(req, res, next) {
  res.render('dashboard/categories', { title: 'Express' });
});

// 分類頁面
router.get('/categories', function(req, res, next) {
  res.render('dashboard/categories', { title: 'Express' });
});

// 註冊頁面
router.get('/signup', function(req, res, next) {
  res.render('dashboard/signup', { title: 'Express' });
});

////////////////////////////////////////////////////////////////////////

// 新增分類
router.post('/categories/create',(req, res)=>{
 const data = req.body;
 const plainData = {...data};
 const categoryRef = categoriesRef.push();
 const key = categoryRef.key;
 plainData.id =key;
 categoryRef.set(plainData)
 .then((result)=>{
    console.log(result);
    res.redirect('/dashboard/categories');
 })
 .catch((err)=>{
    console.log(err);
    res.redirect('/dashboard/categories');
 });
});




module.exports = router;
