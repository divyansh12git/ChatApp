import express from "express";
import { Router } from "express";

const dbRouter=Router();

dbRouter.get('/getmessages',(req,res)=>{
    const myId=req.headers['my_id'];
    const friendId=req.headers['friend_id'];
    

})