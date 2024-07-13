import bodyParser, { urlencoded } from "body-parser";
import express from "express";
import 'dotenv/config'


console.log(process.env.PORT)

const server=express();
const PORT=process.env.PORT || 5001;

server.use(bodyParser,urlencoded({extended:false}))
server.use(bodyParser.json());



server.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
});