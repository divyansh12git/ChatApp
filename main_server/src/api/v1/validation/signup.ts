import {z} from "zod";

const signupInput=z.object({
    name:z.string(),
    username:z.string(),
    email:z.string(),
    password:z.string()

});
export default signupInput;