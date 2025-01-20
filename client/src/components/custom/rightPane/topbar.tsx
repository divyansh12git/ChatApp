import { Phone,MoreVertical } from "lucide-react"
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

export default function Topbar({id,username,profilepic}:{id:number,username:string,profilepic:string}) {
    const onlineUsers=useSelector((state:RootState)=>state.online);
    let isOnline=false;
    if(onlineUsers.some((e)=>e===Number(id))){
        isOnline=true;
    }
    
    
    const profile={
        backgroundSize: 'cover',backgroundPosition: 'center', backgroundImage: `url(${profilepic})`,
    }
    return (
        <div className=" sticky top-0  w-full h-20 bg-[#18171d] grid grid-cols-4">
            <div className="pl-5 col-span-3 flex items-center gap-2"> 
                <div className=" w-20 flex justify-center items-center  ">
                    <div style={profile} 
                    className="bg-white w-[3.2rem] h-[3.2rem] rounded-full border border-white"></div>
                </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-white font-light text-xl -mb-1">{username}</p>
                        <p className="text-zinc-500 font-light text-sm"> {isOnline?"online":""}</p>
                    </div>
            </div>
            <div className="col-span-1 flex justify-center items-center gap-5">
                <div className="hover:bg-zinc-600 bg-zinc-700  w-10 h-10 flex justify-center items-center rounded-full" >
                    <Phone className="h-4 w-4 text-white" />
                </div>
                <div className="hover:bg-zinc-600 bg-zinc-700 w-10 h-10 flex justify-center items-center rounded-full" >
                    <MoreVertical className="h-4 w-4 text-white" />
                </div>
            </div>
        </div>
    )
}