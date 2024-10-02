const mongoose = require('mongoose')
const { ROLES } = require('../constant/constant')

const UserSchema = mongoose.Schema({
    email:{type:String, required:true  ,  match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email address' 
      ]},
    password: {type:String, required:true},
    role:{type:String , enum:Object.values(ROLES) ,default:ROLES.USER }
},{
    versionKey:false
})


module.exports = mongoose.model("User" ,UserSchema)