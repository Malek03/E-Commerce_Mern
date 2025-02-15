import express from 'express';
import { additemToCart,checkout,updateitemInCart,removeitemInCart,clearCart, getActiveCartForUser } from '../services/cartService';
import vaildateJWT from '../middlewares/validateJWT';
import {ExtendRequest} from '../types/extendedRequest';


const router=express.Router();

router.get('/',vaildateJWT,async(req:ExtendRequest,res)=>{
    // TO DO:get the userId from the jwt,after vailditing from middleware.
    try{
        const userId=req?.user?._id;
        const cart=await getActiveCartForUser({userId,populateProduct:true});
        res.status(200).send(cart);
    }
    catch(err){
        res.status(500).send("Some Thing Get Rong!!")
    }

});

router.post('/items',vaildateJWT,async(req:ExtendRequest,res)=>{
    try{
        const userId=req?.user?._id;
        const {productId,quantity}=req.body;
        const response=await additemToCart({productId,quantity,userId});
        res.status(response.statusCode).send(response.data);
    }catch(err){
        res.status(500).send("Some Thing Get Rong!!")
    }
});

router.put('/items',vaildateJWT,async (req:ExtendRequest,res)=>{
    try{
        const userId=req?.user?._id;
        const {productId,quantity}=req.body;
        const response=await updateitemInCart({productId,quantity,userId});
        res.status(response.statusCode).send(response.data);
    }catch(err){
        res.status(500).send("Some Thing Get Rong!!")
    }
});

router.delete('/items/:productId',vaildateJWT,async (req:ExtendRequest,res)=>{
    try{
        const userId=req?.user?._id;
        const {productId}=req.params;
        const response=await removeitemInCart({productId,userId});
        res.status(response.statusCode).send(response.data);
    }catch(err){
        res.status(500).send("Some Thing Get Rong!!")
    }
});

router.delete('/',vaildateJWT,async (req:ExtendRequest,res)=>{
    try{
        const userId=req?.user?._id;
        const response=await clearCart({userId});
        res.status(response.statusCode).send(response.data);
    }catch(err){
        res.status(500).send("Some Thing Get Rong!!")
    }
});


router.post('/checkout',vaildateJWT,async(req:ExtendRequest,res)=>{
    try{
        const userId=req?.user?._id;
        const {address}=req.body
        const response=await checkout({userId,address});
        res.status(response.statusCode).send(response.data);
    }catch(err){
        res.status(500).send("Some Thing Get Rong!!")
    }
});
export default router;