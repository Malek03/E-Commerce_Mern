import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

const app = express();
const port = 3001;

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("Mongo Connected!"))
  .catch((err) => {
    console.log("Faild To Connection !", err);
  });

app.use(express.json())
app.use('/user',userRoute)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
