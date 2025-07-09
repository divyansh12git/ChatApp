import { NextRequest, NextResponse } from "next/server";
import {Chain} from "../../../../zeus";

const chain=Chain(`${process.env.NEXT_PUBLIC_MAIN_SERVER_URL}/graphql`);

export async function GET(request: NextRequest) {
    try{
        const { searchParams } = new URL(request.url);
        const myId =Number( searchParams.get('myId'));
        const response=await chain("query")({
            getRequestUserData:[
                {
                    userId:myId
                },{
                    id:true,
                    Bio:true,
                    name:true,
                    profilePictureURL:true,
                    username:true
                }
            ]
            
            
        });
        if(response.getRequestUserData){
            return NextResponse.json({success:true,data:response.getRequestUserData});
        }
        return NextResponse.json({ success: false,NextRequest:"invalid username" })
    }catch(e){
        console.log(e);
        NextResponse.json({ success: false,NextRequest:"error" })
    }
    
};