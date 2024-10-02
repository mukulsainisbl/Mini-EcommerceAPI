const express = require("express");
const productModel = require("../models/product.model");
const authMiddleware = require("../middlwares/auth.middleware");
const accessMiddleware = require("../middlwares/acess.middleware");
const productRouter = express.Router()

productRouter.get("/get-product", async (req, res) => {
  try {
   
    let product = await productModel.find()
    res.status(201).json({msg: "All Product" , product})
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});



productRouter.post("/add-product",  authMiddleware, accessMiddleware(["seller" , "admin"]), async  (req, res) => {
  try {
   
    let product = new productModel({...req.body ,  sellerId: req.userId})
    await product.save()
    res.status(201).json({msg: "Product  is created" , product})
  } catch (error) {
    res.status(500).json({ msg: " Error in Product Creating", error });
  }
});



module.exports = productRouter;
