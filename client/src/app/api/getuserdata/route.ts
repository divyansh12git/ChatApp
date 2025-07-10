import { NextRequest, NextResponse } from "next/server";
import {Chain} from "../../../../zeus";

const chain=Chain(`${process.env.NEXT_PUBLIC_MAIN_SERVER_URL}/graphql`);

export async function GET(request: NextRequest) {
    try{
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        if(!username )return NextResponse.json({ success: false,NextRequest:"no username provided" });

        const response=await chain("query")({
            getUser:[{
                input:username
            },{
                id:true,name:true,
                username:true,Bio:true,
                friends:true,requested:true,
                number_of_posts:true,
                profilePictureURL:true
            }
            ]
            
        });
        if(response.getUser){
            // console.log(response.getUser);
            return NextResponse.json({success:true,data:response.getUser});
        }
        
    }catch(e){
        console.log(e);
        return NextResponse.json({ success: false,NextRequest:"error" })
    }
    return NextResponse.json({ success: false,NextRequest:"invalid username" })
};