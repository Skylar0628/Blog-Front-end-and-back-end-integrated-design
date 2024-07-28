var express = require('express');
var router = express.Router();
const { db } = require('../connections/firebase_admin_connect');

const striptags = require('striptags');
const moment = require('moment');
const categoriesRef = db.ref('categories');
const articlesRef = db.ref('articles');

// 檔案頁面
router.get('/archives', function (req, res, next) {
    let categories = {};
    const articles = [];
    const status = req.query.status || 'public'
    categoriesRef.once('value').then((sna)=>{
        categories = sna.val();
        return articlesRef.orderByChild('updataTime').once('value')
    }).then((sna)=>{
        sna.forEach((item)=>{
            if(status === item.val().status){
                articles.push(item.val());
            }
        });
        articles.reverse(); // 陣列的方法
        res.render('dashboard/archives', { 
            title: 'Express',
            categories,
            articles,
            striptags,
            moment,
            status
        });
    });
});

// 文章頁面
router.get('/article/create', function (req, res, next) {
    categoriesRef.once('value', (sna) => {
        const categories = sna.val();
        res.render('dashboard/article', {
            title: 'Express',
            categories
        });
    });
});

// 相同版型製作新增與轉址
router.get('/article/:id', function (req, res, next) {
    const id = req.params.id;
    let categories = {};
    categoriesRef.once('value').then((sna)=>{
        categories = sna.val();
        return articlesRef.child(id).once('value')
    }).then((sna)=>{
        const articles = sna.val();
        res.render('dashboard/article',{
            title: 'Express',
            categories,
            articles
        })
    })  
});


// 分類頁面
router.get('/categories', function (req, res, next) {
    const message = req.flash('info');
    categoriesRef.once('value', (sna) => {
        const categories = sna.val();
        res.render('dashboard/categories', {
            title: 'Express',
            categories,
            message,
            hasinfo: message.length > 0
        });
    })
});


// 註冊頁面
router.get('/signup', function (req, res, next) {
    res.render('dashboard/signup', { title: 'Express' });
});

////////////////////////////////////////////////////////

// 新增文章
router.post('/article/create', function (req, res, next) {
   const data = req.body;
   const currentData = {...data}
   const articleRef = articlesRef.push();
   const key = articleRef.key;
   const updataTime = Math.floor(Date.now() / 1000);
   currentData.id = key
   currentData.updataTime = updataTime

   articleRef.set(currentData).then(()=>{
    res.redirect(`/dashboard/article/${key}`) 
   });
});

// 修改文章
router.post('/article/update/:id', function (req, res, next) {
    const data = req.body;
    const id = req.params.id;
    const initData = {...data}
    articlesRef.child(id).update(initData).then(()=>{
      res.redirect(`/dashboard/article/${id}`);
    });
});

// 刪除文章
router.post('/article/delete/:id', function (req, res, next) {
    const id = req.params.id;
    articlesRef.child(id).remove();
    req.flash('info', "文章已刪除");   //存在session 裡面 
    //補充 ajax 不需要重新導向
    res.send('文章已刪除');
    res.end();
})

// 新增分類
router.post('/categories/create', function (req, res, next) {
    const data = req.body;
    const plainData = { ...data }
    const category = categoriesRef.push();
    const key = category.key;
    plainData.id = key;
    // 相同path過濾
    categoriesRef.orderByChild('path').equalTo(plainData.path).once('value', function (sna) {
        if (sna.val()) {
            req.flash('info', "已經有相同路徑");
            res.redirect('/dashboard/categories');
        } else {
            category.set(plainData)
                .then(() => {
                    res.redirect('/dashboard/categories');
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect('/dashboard/categories');
                });
        }
    })
});

// 刪除分類
router.post('/categories/delete/:id', function (req, res, next) {
    const id = req.params.id;
    categoriesRef.child(id).remove();
    req.flash('info', "欄位已刪除");   //存在session 裡面
    res.redirect('/dashboard/categories');
})




module.exports = router;
