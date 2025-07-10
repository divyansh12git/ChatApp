import { NextRequest, NextResponse } from "next/server";
import {Chain} from "../../../../zeus";

const chain=Chain(`${process.env.NEXT_PUBLIC_MAIN_SERVER_URL}/graphql`);

export async function GET(request: NextRequest) {
    try{
        const { searchParams } = new URL(request.url);
        const myId =Number( searchParams.get('myId'));
        const response=await chain("query")({
            getRequestRequestingList:[{
                userId:myId
            },
            {
                request:true,
                requesting:true
            }

            ],
            
            
        });
        if(response.getRequestRequestingList){
            return NextResponse.json({success:true,data:response.getRequestRequestingList});
        }
        
    }catch(e){
        console.log(e);
       return  NextResponse.json({ success: false,NextRequest:"error" })
    }
    return NextResponse.json({ success: false,NextRequest:"invalid username" });
};