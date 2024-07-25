var express = require('express');
var router = express.Router();
const {db} = require('../connections/firebase_admin_connect');

const categoriesRef = db.ref('categories');


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
    const message = req.flash('info');
    categoriesRef.once('value',(sna)=>{
       const categories = sna.val();
       res.render('dashboard/categories', { 
        title: 'Express',
        categories,
        message,
        hasinfo: message.length > 0
    });
    })
  });
  
  // 分類頁面
  router.get('/categories', function(req, res, next) {
    res.render('dashboard/categories', { title: 'Express' });
  });
  
  // 註冊頁面
  router.get('/signup', function(req, res, next) {
    res.render('dashboard/signup', { title: 'Express' });
  });

////////////////////////////////////////////////////////

  // 新增分類
  router.post('/categories/create', function(req, res, next) {
    const data = req.body;
    const plainData = {...data}
    const category = categoriesRef.push();
    const key = category.key;
    plainData.id = key;

    category.set(plainData)
    .then((result)=>{
        console.log(result);
        res.redirect('/dashboard/categories');
    })
    .catch((err)=>{
        console.log(err);
        res.redirect('/dashboard/categories');
    });
  });

  router.post('/categories/delete/:id', function(req, res, next){
     const id = req.params.id;
     categoriesRef.child(id).remove();
     req.flash('info',"欄位已刪除");   //存在session 裡面
     res.redirect('/dashboard/categories');
  })

  
  

module.exports = router;
