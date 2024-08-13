import { Request,Response } from "express";

import {SignUpRequest,err} from "../../../interfaces/types";
import { errmsg } from "../../../helpers";
import signupInput from "../../../validation/signup";


const signupHandler=(req:Request,res:Response)=>{
    try{
        const parsedResponse=signupInput.safeParse(req.body());
        if(!parsedResponse.success)return res.status(401).json(errmsg);
        const UserData:SignUpRequest=req.body;
        
        res.status(200).json({msg:"SignUp Successfully!!!"});
    }catch(e){
        console.log(e);
        res.status(400).json(errmsg);
    }
}

export {signupHandler};