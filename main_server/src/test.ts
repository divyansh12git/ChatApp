import {SignUp} from "./api/v1/middleware/authentication/signup";
import { SignUpRequest } from "./api/v1/interfaces/types";

const obj:SignUpRequest={
    name:"Shivansh Gupta",
    username:"shivansh_777",
    password:"78894545"
}
SignUp(obj);
