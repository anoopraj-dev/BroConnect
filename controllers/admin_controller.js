
// get admin login

const adminLogin =  (req,res) =>{
    res.render('admin_login',{error:null,message:null});
}

//admin authentication

// const adminAuth = async((req,res) => {
//     try {
//         const {name,email,password} =req.body;
//         const admin = await admi
//     } catch (error) {
        
//     }

// })


module.exports = {adminLogin}

