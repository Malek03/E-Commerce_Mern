import express from 'express';
import { additemToCart,updateitemInCart,removeitemInCart,clearCart, getActiveCartForUser } from '../services/cartService';
import vaildateJWT from '../middlewares/validateJWT';
import {ExtendRequest} from '../types/extendedRequest';


const router=express.Router();

router.get('/',vaildateJWT,async(req:ExtendRequest,res)=>{
    // TO DO:get the userId from the jwt,after vailditing from middleware.
    const userId=req?.user?._id;
    const cart=await getActiveCartForUser({userId});
    res.status(200).send(cart);
});

router.post('/items',vaildateJWT,async(req:ExtendRequest,res)=>{
    const userId=req?.user?._id;
    const {productId,quantity}=req.body;
    const response=await additemToCart({productId,quantity,userId});
    res.status(response.statusCode).send(response.data);
});

router.put('/items',vaildateJWT,async (req:ExtendRequest,res)=>{
    const userId=req?.user?._id;
    const {productId,quantity}=req.body;
    const response=await updateitemInCart({productId,quantity,userId});
    res.status(response.statusCode).send(response.data);
});

router.delete('/items/:productId',vaildateJWT,async (req:ExtendRequest,res)=>{
    const userId=req?.user?._id;
    const {productId}=req.params;
    const response=await removeitemInCart({productId,userId});
    res.status(response.statusCode).send(response.data);
});

router.delete('/',vaildateJWT,async (req:ExtendRequest,res)=>{
    const userId=req?.user?._id;
    const response=await clearCart({userId});
    res.status(response.statusCode).send(response.data);
});
export default router;