const User = require("../models/user_models.js");
const bcrypt = require('bcrypt');

const home = (req, res) => {
  res.render("signup", { error: null,message:null });
};

const userSignup = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.render("signup", { error: "Password mismatch! Try again" ,message:null});
    }

    const existingUser = await User.findOne({$or: [{email:email},{phone:phone }]});
    if (existingUser) {
      console.log("duplicate email/phone error");
      return res.render("signup", {
        error: "User with the email/phone already exists!",
        message:null
      });
    }
    //validating non empty fields

    if(name.trim()==='' || email.trim()===''|| phone.trim() ==='' || password.trim() ==='' || confirmPassword.trim()===''){
        return res.render('signup',{error:'All fields are required!',message:null})
    }
    //create new user
    const newUser = new User({
        name,
        email,
        phone,
        password
    });

     await newUser.save();

    res.render('signup',{error:null,message:'User registered succesfully!'})
  } catch (error) {
    console.log("User registration failed! ", error);
    return res.render('signup',{error:null,message:null});
  }
};

//user login controller

const userLogin = (req,res) => {
  res.render('user_login',{error:null});
}

const userAuth = async (req,res) => {
  try {
    const {email,password} = req.body
    const user = await User.findOne({email});

    if(!user){
      return res.render('user_login',{error:'User not found!  '})
    }
    const isAuthenticated = await user.comparePassword(password,user.password);
    if(!isAuthenticated){
      return res.render('user_login',{error:'Invalid credentials'});
    }

    //save user in session

    req.session.userId = user._id;
    req.session.user = user;
    console.log(req.session);

    res.redirect('/user/dashboard');
    console.log('redirected')
    
    
  } catch (error) {
    res.render('user_login',{error:'Invalid user credentials'});
  }
}

//user dashboard
const userDash = (req,res) =>{
  if(req.session.user){
    res.render('user_dashboard',{username:req.session.user.name});
  }
  
}

//user logout

const userLogout = (req,res) =>{
  req.session.destroy((err) =>{
    if(err){
      res.send('Logout error');
    }
  })
  res.clearCookie('connect.sid');
  res.redirect('/user/login')
}

module.exports = { home ,userSignup,userLogin,userAuth,userDash,userLogout};
