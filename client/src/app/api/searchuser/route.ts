import { NextRequest, NextResponse } from "next/server";
import {Chain} from "../../../../zeus";

const chain=Chain(`${process.env.NEXT_PUBLIC_MAIN_SERVER_URL}/graphql`);

export async function GET(request: NextRequest) {
    try{
        const { searchParams } = new URL(request.url);
        const condition = searchParams.get('searchquery');
        if(!condition )return NextResponse.json({ success: false,NextRequest:"no search Query provided" });

        const response=await chain("query")({
            getAllUsers:[{
                input:condition
            },{
                id:true,
                name:true,
                username:true,
                Bio:true,
                profilePictureURL:true
            }
            ]
            
        });
        // console.log(condition);
        // console.log(response);
        if(response.getAllUsers){
            return NextResponse.json({success:true,data:response.getAllUsers});
        }
        
    }catch(e){
        console.log(e);
        return NextResponse.json({ success: false,NextRequest:"error" })
    }
    return NextResponse.json({ success: false,NextRequest:"invalid username" })
};