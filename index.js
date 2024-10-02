require('dotenv').config()
const express = require("express");
const app = express();
const connection = require("./config/db");
const userRouter = require('./routes/user.route');
const productRouter = require('./routes/product.route');
const cartRouter = require('./routes/cart.route');
app.use(express.json());

const PORT = process.env.PORT || 8080

app.use('/user' , userRouter)
app.use('/product' , productRouter)
app.use('/cart' , cartRouter)

app.listen(PORT, async () => {
  try {
    await connection
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error in connecting in DB" , error)
  }
  console.log(`Server is listen on ${PORT}`)
});
