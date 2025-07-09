import { NextRequest, NextResponse } from "next/server";
import {Chain} from "../../../../zeus";

const chain=Chain(`${process.env.NEXT_PUBLIC_MAIN_SERVER_URL}/graphql`);

export async function POST(request: NextRequest) {
    // console.log("i am first")
    try{
        const {myId,userId,action}=await request.json();
        // console.group(action);
        // console.group("yoyoyoyoy");
        if(!myId || !userId )return NextResponse.json({ success: false,NextRequest:"aome parameters not provided" });
        
        const response=await chain("mutation")({
            actionOnRequest:[
                {
                    myId:myId,
                    accept:action,
                    userId:userId
                },true
            ]
            
        });
        // console.log(response);
        if(response.actionOnRequest  ){
            return NextResponse.json({success:true,data:response.actionOnRequest});
        }
        return NextResponse.json({ success: false,NextRequest:"request not sent"});
    }catch(e){
        console.log(e);
        NextResponse.json({ success: false,NextRequest:"error" })
    }
    
};


