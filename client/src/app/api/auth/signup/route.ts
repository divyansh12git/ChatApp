import { NextRequest, NextResponse } from "next/server";
import {Chain} from "../../../../../zeus";

const chain=Chain("http://localhost:5000/graphql");
interface SignUpData{
    name:string,
    username:string,
    password:string,

}
export async function POST(request: NextRequest) {

    const data:SignUpData=await request.json();
    console.log(data);
    if(!data.username || !data.password || !data.name || data.password.length<8 || data.username.includes(" "))
            return NextResponse.json({msg:"data invalid"}); 
        let token="";
        let msg="";
        let status=false
        try{
            const response=await chain("mutation")({
                signUp:[{
                    input:{
                        ...data
                    }
                },true
            ]
            });
            if(response.signUp){
                token=response.signUp;
            }
            
            if(token=="invalid")msg="user already exists";
            else{
                status=true
                msg="successfully created user";
            } 
        }catch(e){
            msg="can't connect to server";
            console.log(e);
        }
        console.log(token);
        
    return NextResponse.json({status:status,msg:msg});
}