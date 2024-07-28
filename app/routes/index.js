var express = require('express');
var router = express.Router();
const { db } = require('../connections/firebase_admin_connect');

const striptags = require('striptags');
const moment = require('moment');
const categoriesRef = db.ref('categories');
const articlesRef = db.ref('articles');


/* GET home page. */
router.get('/', function(req, res, next) {
  let categories = {};
  const articles = []
  categoriesRef.once('value').then((sna)=>{
      categories = sna.val();
      return articlesRef.orderByChild('updataTime').once('value')
  }).then((sna)=>{
      sna.forEach((item)=>{
          if('public' === item.val().status){
              articles.push(item.val());
          }
      });
      articles.reverse(); // 陣列的方法
      res.render('index', { 
          title: 'Express',
          categories,
          articles,
          striptags,
          moment,
      });
  });

});

// 補充課程：Sass 與 includePaths
router.get('/post/:id', function(req, res, next) {
  const id = req.params.id;
  let categories = {};
  categoriesRef.once('value').then((sna)=>{
      categories = sna.val();
      return articlesRef.child(id).once('value')
  }).then((sna)=>{
      const articles = sna.val();
      res.render('post',{
          title: 'Express',
          categories,
          articles,
          striptags,
          moment
      })
  })  
});



module.exports = router;
