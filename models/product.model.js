const mongoose = require('mongoose')
const ProductSchema = mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String},
    price:{type:Number, required:true, default:100},
    quantity:{type:Number, required:true,   default:10 },
    sellerId : {type:mongoose.Schema.Types.ObjectId , ref : "User"}
},{
    versionKey:false
})

module.exports  = mongoose.model('Product' , ProductSchema)