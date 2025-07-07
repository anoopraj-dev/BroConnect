const Admin = require('../models/admin_models.js');
const User = require('../models/user_models.js');
// get admin login

const adminLogin =  (req,res) =>{
    res.render('admin_login',{error:null,message:null});
}

//admin authentication

const adminAuth = async(req,res) => {
    try {
        const {name,email,password} =req.body;
        const admin =await Admin.findOne({email});

        if(!admin){
            console.log('Admin user not found!');
            res.send('Admin user not found!')
        }

        console.log(admin.email, admin.password);

        if(admin.email=== email && admin.password===password){

            req.session.admin = admin.name;
            return res.redirect('/admin/dashboard')
        }
        else{
            res.redirect('/admin/login');
        }
    } catch (error) {
        console.log('Error logging in',error);
        res.send('Login failed');
    }

}

const adminDash = async (req,res) => {
    try{
        if(!req.session.admin){
            return res.redirect('/admin/login');
        }
        const users = await User.find();

        res.render('admin_dashboard',{users})
    }catch(error){
        console.log(error);
        res.send('Error fetching users');
    }
}

const editUser = async (req,res) => {
    try {
        
        const user = await User.findOne({email});

        

    } catch (error) {
        console.log('error',error);
        res.send('Some error occured');
    }
}


module.exports = {adminLogin,adminAuth,adminDash}

