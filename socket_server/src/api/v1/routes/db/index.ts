import express from "express";
import { Router } from "express";
import { insertMessage } from "../../services/cassandra";
import { getMessages } from "../../services/cassandra";
const dbRouter=Router();

dbRouter.get('/',(req,res)=>{
    res.json({data:"hi from messages "})
})
dbRouter.get('/get',async(req,res)=>{
    console.log(req.headers);
    const userId=(req.headers['userid']);
    const friendId=(req.headers['friendid']);
    console.log(userId+" "+friendId);
    if(!userId || !friendId  ){
        return res.status(405).json({status:false,desc:"invalid data parameters provided"});
    }
    // console.log(data);
    const result=await getMessages({ sender_id: Number(userId), receiver_id: Number(friendId) });
    console.log(result);
    if(result){
        res.send({status:true,data:result});
    }else{
        res.status(500).send({status:false,desc:"unable to fetch messages"});
    }
})

dbRouter.post('/insert',async(req,res)=>{
    const data=req.body;
    console.log(data);
    if(!(data.sender_id && data.receiver_id && data.message && data.time && data.message.length>0)){
       return res.status(405).json({status:false,desc:"invalid data parameters provided"});
    }
    const result=await insertMessage({
        sender_id:Number(data.sender_id),
        receiver_id:Number(data.receiver_id),
        message:data.message,
        time:data.time
    })
    if(result){
        res.status(200).json({status:true,desc:"successfully inserted message"});
    }else{
        res.status(500).json({status:false,desc:"unable to insert data"});
    }

})

export {dbRouter};