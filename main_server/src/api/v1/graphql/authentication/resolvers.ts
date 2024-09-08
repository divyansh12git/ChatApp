import { SignInCredentials,SignUpCredentials } from "../../interfaces/requests";
import { SignInHandler,SignUpHandler } from "../../middleware";
import { createToken, EncrptData } from "../../helpers";
const mutation={

    signIn:async(_:any,{input}:{input:SignInCredentials}):Promise<String>=>{
        console.log("req for sign in");
        console.log(input);
        const status:Boolean=await SignInHandler(input);
        let token:String="invalid";
        if(status){
            token = createToken(input.username);
            // console.log(token);
            
            // console.log(encToken.t);
            return "Bearer: " +token;
        }
        return  token;
    },

    signUp:async(_:any,{input}:{input:SignUpCredentials}):Promise<String>=>{
        
        const status:Boolean=await SignUpHandler(input);
        let token:String="invalid";
        if(status){
            token = createToken(input.username);
            // console.log(token);
            // console.log(encToken.t);
            return "Bearer: " + token;
        }
        // console.log(token);
        return token;
    }
}

export const Resolver= {mutation}