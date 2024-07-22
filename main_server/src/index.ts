import bodyParser, { urlencoded } from "body-parser";
import express from "express";
import 'dotenv/config'
import { SignUp } from "./api/v1/middleware/authentication/signup";
import { User } from "./api/v1/interfaces/types";
import mutateUser from "./api/v1/controllers/dbcontroller/CreateUser";
console.log(process.env.PORT)

const server=express();
const PORT=process.env.PORT || 5001;

server.use(bodyParser,urlencoded({extended:false}));
server.use(bodyParser.json());
const user:User={
    name:"Divyansh Gupta",
    email:"divyanshgupta1811@gmail.com",
    username:"divyansh_8",
    password:"124452",
    profilePictureURL:"45"
}
// SignUp(user);
mutateUser(user);

server.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
});