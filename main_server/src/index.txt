import bodyParser, { urlencoded } from "body-parser";
import express from "express";
import 'dotenv/config'
import { SignUp } from "./api/v1/middleware/authentication/signup";
import { User } from "./api/v1/interfaces/types";

import { userDBManager,deleteUserStrategy,
getAllUserStrategy,getUserStrategy,mutateUserStrategy } from "./api/v1/controllers";


console.log(process.env.PORT)

const server=express();
const PORT=process.env.PORT || 5001;

server.use(bodyParser,urlencoded({extended:false}));
server.use(bodyParser.json());
const user:User={
    name:"Divyansh Gupta",
    username:"divyansh_8888",
    password:"124452",
    profilePictureURL:"45"
}

async function main(){
    const mutateData=new mutateUserStrategy;
    const manager=new userDBManager(mutateData);
    // await manager.doAction(user);
    const getall=new getAllUserStrategy()
    manager.strategy=getall;
    const users:User[]|User|Boolean=await manager.doAction("");
    console.log(users);
    const getUser=new deleteUserStrategy();
    manager.strategy=getUser;
    // console.log(await manager.doAction("divyansh_8888"));
}
main();
server.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
});