var express = require('express');
var router = express.Router();
const { db } = require('../connections/firebase_admin_connect');

const striptags = require('striptags');
const moment = require('moment');
const categoriesRef = db.ref('categories');
const articlesRef = db.ref('articles');


/* GET home page. */
router.get('/', function(req, res, next) {
  const currentPage = req.query.page || 1;
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

      // 分頁

      const totalResult = articles.length;
      const perpage = 3; // 每頁3筆
      const perpageTotal = Math.ceil(totalResult / perpage);
      // const currentPage = 1;
      if(currentPage > perpageTotal) {
        currentPage = perpageTotal
      }

      const miniitem = (currentPage * perpage) - perpage + 1;
      const maxitem = (currentPage * perpage);
      const data =[];
      articles.forEach((item, i)=>{
        let itemNum = i + 1;
        if (itemNum >= miniitem && itemNum<= maxitem){
          data.push(item)
        }
      });
      const page = {
        perpageTotal,
        currentPage,
        hasPer: currentPage > 1,
        hasNex: currentPage < perpageTotal
       }
      // 分頁結束

      articles.reverse(); // 陣列的方法
      res.render('index', { 
          title: 'Express',
          categories,
          articles: data,
          striptags,
          moment,
          page
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
