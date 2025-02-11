const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength:[3, 'First name  must  be at least  3 Character long']
        },
        lastname:{
            type: String,
            minlength:[3, 'Last name  must  be at least  3 Character long']
        }

    },

    email:{
        type:String,
        required:true,
        unique: true,
        minlength:[5 ,'Email must have 5 Character']
    },

    password:{
        type:String,
        required: true,
        select:false
    },

    // socketId:{
    //     type:string,
    // },

})

userSchema.method.generateAuthToken= function(){
 const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET)
 return token;
}

userSchema.method.comparePassword = async function (password){
    return await bcrypt.compare(password , this.password); 
}

userSchema.static.hashPassword=async function (password) {
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user' , userSchema);

module.exports = userModel;