import {useState,useEffect} from "react";
import { UseSelector,useDispatch, useSelector } from "react-redux";
import { searchUser } from "@/lib/types/entities";
import RequestUserCard from "../../../ui/customComponents/requestUserCard"
import {getRequestUserData} from "@/lib/services/api"
import { RootState } from "@/lib/store/store";
import { Loader } from "@/components/ui";

function Requests (props:any) {
    const myId=useSelector((state:RootState)=>state.personalInformation).id
    const [requestList,setRequestList]=useState<searchUser[]>([]);
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        if(myId){
            setLoading(true);
            getRequestUserData(myId).then((data)=>{
                if(data){
                    setRequestList([]);
                    data.map((user)=>{
                        setRequestList((prev)=>{
                            return [...prev,user]
                        })
                    })
                }
            }).finally(()=>setLoading(false));
        }
    },[])

    return (
        <>
            <div className="bg-[#1c1c24] w-full col-span-7 flex flex-col items-center ">
                <div className="text-white mx-auto text-2xl my-3">
                    Request Box
                </div>
            <div style={{overflow: "auto", scrollbarWidth: "none"}} className="h-[33rem]  my-3 w-11/12 rounded-xl mx-5 bg-zinc-700 overflow-y-scroll overflow-x-hidden">
                    {
                        !(requestList.length)?loading?<div className="h-10 w-10 mx-auto my-10">
                                                            <Loader />
                                                        </div>:
                        <div className=" mx-4 my-4 text-white font-light">
                            No user Found...</div>:
                                requestList.map((user:searchUser,ind)=>{
                                    return(
                                        <RequestUserCard key={ind} userId={user.id} Bio={user.Bio} username={user.username} profilePic={user.profilePictureURL} />
                                    );
                                })
                    }  
                </div>
            </div>
        </>

    );
}

export default Requests;