import {useState,useEffect} from "react";
import { UseSelector,useDispatch, useSelector } from "react-redux";
import { searchUser } from "@/lib/types/entities";
import RequestUserCard from "../../../ui/customComponents/requestUserCard"
import {getRequestUserData} from "@/lib/services/api"
import { RootState } from "@/lib/store/store";

function Requests (props:any) {
    const myId=useSelector((state:RootState)=>state.personalInformation).id
    const [requestList,setRequestList]=useState<searchUser[]>([]);

    useEffect(()=>{
        if(myId){
            getRequestUserData(myId).then((data)=>{
                if(data){
                    data.map((user)=>{
                        setRequestList((prev)=>{
                            return [...prev,user]
                        })
                    })
                }
            })
        }
    },[])

    return (
        <>
            <div className="bg-[#1c1c24] w-full col-span-7 flex flex-col items-center ">
            <div style={{overflow: "auto", scrollbarWidth: "none"}} className="h-full  my-3 w-11/12 rounded-xl mx-5 bg-zinc-700 overflow-y-scroll overflow-x-hidden">
                    {
                        !(requestList.length)?<div className=" mx-4 my-4 text-white font-light">
                            No user Found...</div>:
                                requestList.map((user:searchUser)=>{
                                    return(
                                        <RequestUserCard key={user.id} userId={user.id} Bio={user.Bio} username={user.username} profilePic={user.profilePictureURL} />
                                    );
                                })
                    }  
                </div>
            </div>
        </>

    );
}

export default Requests;