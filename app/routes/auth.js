const express = require('express');
const router = express.Router();
const {auth } = require('../connections/firebase_client');
const {db} =require('../connections/firebase_admin_connect')

router.get('/signup', (req, res)=>{
    const message = req.flash('error')
    res.render('dashboard/signup',{
      message,
      hasErrors: message.length > 0,
    })
});

router.get('/signin',(req, res)=>{
  const message = req.flash('error')
    res.render('dashboard/signin',{
      message,
      hasError: message.length > 0
    })
})

////////////////////////////////////////////////////////////////  
  
router.post('/signup',(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword =  req.body.confirm_password;
  if(password != confirmPassword) {
    req.flash('error','兩個密碼輸入不相同');
    res.redirect('/auth/signup');
  }
  
  auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential)=>{
    const user = userCredential.user
    const savedate = {
        "email": email,
        "uid": user.uid
       }
    db.ref('/users/' + user.uid).set(savedate);
    res.redirect('/auth/signup');
  })
  .catch((err)=>{
    const errMessage = err.message
    req.flash('error', errMessage); // 使用 req.flash 存储错误消息
    res.redirect('/auth/signup');
})
 

})

router.post('/singin',(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  auth.signInWithEmailAndPassword(email,password)
  .then((userCredential)=>{
    const user = userCredential.user;
    req.session.uid = user.uid;
    req.session.email = req.body.email;
    res.redirect('/dashboard')
  })
 .catch((err)=>{
  console.log(err)
  res.redirect('/auth/signin')
 })
})

module.exports = router;
