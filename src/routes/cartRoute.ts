import express from 'express';
import { getActiveCartForUser } from '../services/cartService';
import {vaildateJWT,ExtendRequest} from '../middlewares/validateJWT';


const router=express.Router();

router.get('/',vaildateJWT,async(req:ExtendRequest,res)=>{
    // TO DO:get the userId from the jwt,after vailditing from middleware.
    const userId=req.user._id;
    const cart=await getActiveCartForUser({userId});
    res.status(200).send(cart);
});

export default router;