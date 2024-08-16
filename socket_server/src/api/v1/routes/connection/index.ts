import express from "express";


const connectionRouter=express.Router();

connectionRouter.get("/",(req,res)=>{

    res.json({msg:"you ping the connection route"});
});


export {connectionRouter} ;