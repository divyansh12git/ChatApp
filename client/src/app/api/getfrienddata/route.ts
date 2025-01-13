import { NextRequest, NextResponse } from "next/server";
import {Chain} from "../../../../zeus";

const chain=Chain("http://localhost:5000/graphql");

export async function GET(request: NextRequest) {
    // console.log("i am first")
    try{
        const { searchParams } = new URL(request.url);
        let userId = Number(searchParams.get('userId'));
        // console.group(userId);
        // console.group("yoyoyoyoy");
        if(!userId )return NextResponse.json({ success: false,NextRequest:"no userId provided" });
        
        const response=await chain("query")({
            getFriendsData:[
                {
                    userId:userId
                },{
                    id:true,name:true,
                    username:true,Bio:true,
                    friends:true,requested:true,
                    number_of_posts:true,
                    profilePictureURL:true
                }
            ],
            getUserToRoomData:[
                {userId:userId},{
                friendID:true,roomID:true
            }]
            
        });
        if(response.getFriendsData && response.getUserToRoomData){
            return NextResponse.json({success:true,data:{friends:response.getFriendsData,rooms:response.getUserToRoomData}});
        }
        return NextResponse.json({ success: false,NextRequest:"no data available" });
    }catch(e){
        console.log(e);
        NextResponse.json({ success: false,NextRequest:"error" })
    }
    
};

