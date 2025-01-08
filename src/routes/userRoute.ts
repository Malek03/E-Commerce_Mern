import express from "express";
import { login, register } from "../services/userService";

const router = express.Router();

router.post("/register", async (req, res) => {
  try{
    const { firstName, lastName, email, password } = req.body;
    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(statusCode).send(data);
  }catch(err){
    res.status(500).send("Some Thing Get Rong!!")
}
});

router.post("/login", async (req, res) => {
  try{
    const { email, password } = req.body;
    const { statusCode, data } = await login({ email, password });
    res.status(statusCode).send(data);
  }catch(err){
    res.status(500).send("Some Thing Get Rong!!")
}
});

export default router;
