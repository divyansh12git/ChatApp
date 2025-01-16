import {useState} from "react";
import {useSelector} from "react-redux"
import { RootState } from "@/lib/store/store";
import profile1 from "@/../public/images/profile/2.png";
import Accept from "@/../public/icons/accept.png"
import Decline from "@/../public/icons/decline.png"
import Image from "next/image";
import RequestBox from "./box/requestBox";
import NormalBox from "./box/normalBox";
import { handleRequest } from "@/lib/services/api";
import Loader from "../loader";

interface props{
  userName:string;
  Bio:string;
  profilePic:string;
  userId:number;
  status:string;
}
const SearchUserCard=({userName,Bio,profilePic,userId,status}:props)=>{
    const profilepicStyle = {
        backgroundImage:`url(${profile1.src})` , 
         // .src gives the URL path of the image
        backgroundSize: 'cover', // adjust as needed
        backgroundPosition: 'center',
      }

      const myId=useSelector((state:RootState)=>state.personalInformation).id;
      const [request,setRequest]=useState<Boolean>(true);
      const [sentSuccess,setSentSuccess]=useState(false);

      const handleRequestButton=async()=>{
        setRequest(false);
       const status=await handleRequest({
          myId:Number(myId),
          sending:true,
          action:true,
          userId:userId
        })
        if(!status)setRequest(true);
        else setSentSuccess(true)

      }

    return(
        <div className="hover:bg-[#54545427]  flex w-full flex-col" >
              <div  className="flex flex-row h-24 " >
                <div className=" w-28 flex justify-center items-center ">
                  <div style={profilepicStyle} className="bg-white w-[3.5rem] h-[3.5rem] rounded-full border border-white">.</div>
                </div>
                <div className=" w-full flex flex-row justify-start items-center hover:cursor-default">
                    <div className="px-2 overflow-hidden truncate h-full flex flex-col justify-center w-[11.5rem]">
                      <p className="font-medium text-lg text-white -mb-1">{userName}</p>
                      <p className=" font-extralight text-sm text-zinc-400 ">{Bio}</p>
                    </div>
                    {
                      status==="requesting"?<NormalBox action={"Requesting"} />:
                      status==="friend"?<NormalBox action={"Friend"} />:
                      request?<RequestBox handler={handleRequestButton}  action={"Request"} />:
                      sentSuccess?<NormalBox action={"Requested"} />:<Loader />
                    }
                    

                </div>
                
              </div>
              <div className="h-[1px] w-[93%] bg-white self-center"></div>
        </div>
    );


}
export default SearchUserCard;