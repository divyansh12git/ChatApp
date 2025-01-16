import express from "express";
import { Router } from "express";

const dbRouter=Router();

dbRouter.get('/getmessages',(req,res)=>{
    const myId=req.headers['myId'];
    const friendId=req.headers['friendId'];
    

})