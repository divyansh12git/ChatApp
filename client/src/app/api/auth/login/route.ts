import { NextRequest, NextResponse } from "next/server";
import {Chain} from "../../../../../zeus";

const chain=Chain("http://localhost:5000/graphql");
interface loginData{
    username:string,
    password:string
}
export async function POST(request: NextRequest) {

    //set content-type:"application/json"
    //send data in raw json
    //for url encoded: request.formdata();
    
    const {username,password}=await request.json();
    console.log(username)
    console.log(password)
    if(!username || !password)return NextResponse.json({ success: false,NextRequest:"Data invalid" });
    const data:loginData={
        username:username,
        password:password
    }
    let token="";
    let status=false;
    let msg="";
    try{
        const response=await chain("mutation")({
            
            signIn: [{
                input: {
                    username: data.username,  
                    password: data.password
                }
            },true]
        });
        if(response.signIn){
            msg="successfully logged in"
            status=true
            token=response.signIn;
        }else{
            msg="invalid credentials";
        }
    }catch(e){
        msg="can't connect to server"
        console.log(e);
    }
    // const x:string=username
    // try{
    //     const res=await chain("query")({
    //         getUser:[{
    //             input:username
    //         },{
    //             name:true,
    //             friends:true,
    //             username:true
    //         }]
    //     });
    //     console.log(res);
    // }catch(e){
    //     console.log(e);
    // }

    console.log(token);
    return NextResponse.json({ status: status,msg:msg });
}