const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase:true
    },
    phone:{
        type: Number,
        required: true,
        unique:true,
        match: [/^\d{10}$/,'Must be 10 digits']

    },
    password:{
        type: String,
        required:true
    }
})

// attaching presave hook on userSchema
userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();

    try{
        console.log('Hashing password!');
        this.password = await bcrypt.hash(this.password,6);
        next();
    }
    catch(err){
        console.log('Hashing failed!');
        next(err);
    }
})

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password,this.password);
}

const User = mongoose.model('User',userSchema);

module.exports = User;