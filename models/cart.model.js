const mongoose = require('mongoose')
const CartSchema = mongoose.Schema({
buyerId:{type:mongoose.Schema.Types.ObjectId , ref:"User" },
products :[{type:mongoose.Schema.Types.ObjectId , ref: "Product"}],
totalCartValue:{type:Number}

   
},{
    versionKey:false
})

module.exports  = mongoose.model('Cart' , CartSchema)