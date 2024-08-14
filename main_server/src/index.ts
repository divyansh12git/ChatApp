import bodyParser, { urlencoded } from "body-parser";
import express from "express";
import cors from "cors";
import 'dotenv/config'


import startApolloGraphqlServer from "./api/v1/graphql";
import {expressMiddleware} from "@apollo/server/express4";

(async()=>{


    const server=express();
    const PORT=process.env.PORT || 5001;
    
    server.use(cors());
    server.use(express.json());
    server.use(require('express-status-monitor')());//localhost:${port}/status
    //creating graphql server:
    
    try{
        const gqlServer=await startApolloGraphqlServer()
        server.use("/graphql",
                    cors<cors.CorsRequest>(), 
                    express.json(),
                    expressMiddleware(gqlServer)
                );
    }catch(e){
        console.log(`error in init gql server ${e}`);
    }

    server.get("/",(req,res)=>{
        res.json({msg:"this is from chat app server!!!"})
    })

    server.listen(PORT,()=>{
        console.log(`Server is running on port: ${PORT}`)
    });

})();//init express app