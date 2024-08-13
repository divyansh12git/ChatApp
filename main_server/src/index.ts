import bodyParser, { urlencoded } from "body-parser";
import express from "express";
import cors from "cors";
import 'dotenv/config'

import startApolloGraphqlServer from "./api/v1/graphql";
import {expressMiddleware} from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";

(async()=>{


    const server=express();
    const PORT=process.env.PORT || 5001;
    
    server.use(cors());
    server.use(express.json());
    //creating graphql server:

    try{
        const gqlServer=await startApolloGraphqlServer()
        server.use("/graphql",expressMiddleware(gqlServer));
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