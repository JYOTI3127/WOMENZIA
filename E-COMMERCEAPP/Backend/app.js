const express = require('express');
const app = express();
const cors = require("cors");

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const {connectDB} = require('./src/config/dbConnection');
connectDB();

const authRoutes = require("./src/routes/user/auth")
const productRoutes = require("./src/routes/product/product");
const cartRoutes = require("./src/routes/product/cart");


app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);

app.listen(3000, () => {
    console.log(`app is running on port ${process.env.PORT || 3000}`);
})