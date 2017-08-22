var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:"./uploads/"});
var User = require('../models/user.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register', function(req, res, next) {

  res.render('register',{title:"register"});
});
router.get('/login', function(req, res, next) {
  res.render('login',{title:"login"});
});

router.post('/register',upload.single('image'),function(req, res, next) {
 	var name =req.body.name;
 	var email =req.body.email;
 	var password =req.body.password;
 	var username =req.body.username;
 
 	
 	if (req.file) {
 		console.log("uplaod file");
 		var image = req.file.filename;
 	}else{
 		console.log("no upload file");
 		var image = "noimage.jsp";
 	}
 	//formvalidaipn
 	req.checkBody('name','Name is require').notEmpty();

 	req.checkBody('email','Email is require').notEmpty();
 	req.checkBody('username','Username is require').notEmpty();
 	req.checkBody('password','password is require').notEmpty();
 	
  
 	req.getValidationResult().then(error => {
 		console.log(error.array().length);
 		if (error.array().length > 0) {
 			console.log("msg");
 			res.render('register',{
 				errors: error.array()
 			});

 		}else{
 			var newUser = new User({
 				username:username,
				password:password,
				name:name,
				image:image,
				email:email
 			});
 			User.createUser(newUser,function (err) {
 				if (err) {
 					throw new Error("can not add user");
 				}else{
 				res.redirect('/');

 				}
 			});
 		}
 		
 	});
});

module.exports = router;
