import { NextRequest, NextResponse } from "next/server";
import {Chain} from "../../../../zeus";

const chain=Chain("http://localhost:5000/graphql");

export async function POST(request: NextRequest) {
    console.log("i am first")
    try{
        const {myId,userId}=await request.json();
        console.log(request.json());
        // console.group(userId);
        // console.group("yoyoyoyoy");
        if(!myId || !userId )return NextResponse.json({ success: false,NextRequest:"some parameters not provided" });
        
        const response=await chain("mutation")({
            sendRequest:[
                {
                    myId:myId,
                    userId:userId
                },true
            ]
            
        });
        if(response.sendRequest  ){
            return NextResponse.json({success:true,data:response.sendRequest});
        }
        return NextResponse.json({ success: false,NextRequest:"request not sent"});
    }catch(e){
        console.log(e);
        NextResponse.json({ success: false,NextRequest:"error" })
    }
    
};


