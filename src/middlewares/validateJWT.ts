import{Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

//لان متغير user ليس موجود على req كما استدعيناه بسطر 33 فنقوم بعمل التالي

export interface ExtendRequest extends Request{
    user?: any;
}

export const vaildateJWT=(req:ExtendRequest,res:Response,next:NextFunction)=>{
    const authorizationHeader=req.get('authorization');
    if(!authorizationHeader){
        res.status(403).send('Authorization header was not provided');
        return;
    }
    const token=authorizationHeader.split(" ")[1];//Remove Bearer
    if(!token){//!token =>token===undefined||token===null||token===''
        res.status(403).send('Bearer token not found!')
    }
    jwt.verify(token,'o1wuoqzfZlavTzSxccesYT9yoTKR3QBI',async(err,payload)=>{
        if(err){
            res.status(401).send("Invalid token");
            return;
        }
        if(!payload){
            res.status(401).send("Invalid token Payload");
            return;
        }
        //Fetch user from database based on the payload
        const userpayload=payload as {
            email:string;
            firstName:string;
            lastName:string;
        };
        const user=await userModel.findOne({email:userpayload.email});
        req.user=user;
        next();//يعني انتهت MiddleWare ولان نفذ الدالة التالية
    });
}
