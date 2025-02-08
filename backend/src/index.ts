import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialProducts } from "./services/productService";
import cors from "cors";

dotenv.config();
const app = express();
const port = 3001;

mongoose
  .connect(process.env.DB_URL||' ')
  .then(() => console.log("Mongo Connected!"))
  .catch((err) => {
    console.log("Faild To Connection !", err);
  });

app.use(cors());
app.use(express.json())
app.use('/user',userRoute)
app.use('/product',productRoute)
app.use('/cart',cartRoute)
seedInitialProducts();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});