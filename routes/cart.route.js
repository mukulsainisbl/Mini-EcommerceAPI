const express = require("express");
const authMiddleware = require("../middlwares/auth.middleware");
const accessMiddleware = require("../middlwares/acess.middleware");
const cartModel = require("../models/cart.model");
const productRouter = require("./product.route");
const productModel = require("../models/product.model");
const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  const allProd = await cartModel.find();
  res.status(200).json({ msg: "All product", allProd });
});

cartRouter.post(
  "/add/:id",
  authMiddleware,
  accessMiddleware(["admin", "buyer"]),
  async (req, res) => {
    let cart = await cartModel.findOne({ buyerId: req.userId });


    if (cart) {
        if(cart.products.includes(req.params.id)){
            res.json({msg: "Product already present in the cart"})
            return
        }
        let product = await productModel.findOne({_id: req.params.id})
      cart.products.push(req.params.id);
      cart.totalCartValue = cart.totalCartValue+  product.price
      cart.save();
      res.json({ msg: cart });
    } else {
      let data = await cartModel.create({ buyerId: req.userId });
      data.products.push(req.params.id);
      let product = await productModel.findOne({_id: req.params.id})
     
      data.save();
      res.json({ msg: data });
    }
  }
);

cartRouter.delete('/:id' , authMiddleware, accessMiddleware(["buyer" , "admin"]) , async (req,res) => {
    let cart = await cartModel.findOne({buyerId: req.userId})
    if(cart){
        let data = await cartModel.findOneAndUpdate({buyerId: req.userId} , {$pull : {products: req.params.id}})
        let product = await productModel.findOne({_id: req.params.id})
        cart.totalCartValue = cart.totalCartValue -  product.price
        cart.save()
        res.json({Msg : "Product Removed" })
    }else{
        res.json({msg: "Cart not found"})
    }
})

module.exports = cartRouter;
