import {useState,useEffect} from "react";
import {Search } from "lucide-react"
import { UseDispatch,useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import SearchUserCard from "../../../ui/customComponents/searchUserCard";
import { getLists } from "@/lib/services/api";
import {searchUsers} from "@/lib/services/api";
import { searchUser } from "@/lib/types/entities";
interface searchUserList{
    userData:searchUser,
    status:string
}
function SearchUsers () {
    const [search,setSearch]=useState("");
    const [usersList,setUsersList]=useState<searchUserList[]>([]);

    const myId=useSelector((state:RootState)=>state.personalInformation).id;
    const friendList=useSelector((state:RootState)=>state.friendlist);
    const requestList=useSelector((state:RootState)=>state.requestList);
    const requestingList=useSelector((state:RootState)=>state.requestingList);
    
    useEffect(()=>{
        if((!requestList.length || !requestingList) && myId.length){
            getLists(Number(myId)).then((e)=>{
                console.log(e);
            });
        }
    },[])

    const findStatus=(userid:number)=>{
        userid=Number(userid);
        if(friendList.some((e)=>e===userid)){
            return "friend";
        }
        if(requestList.some((e)=>e===userid)){
            return "request";
        }
        if(requestingList.some((e)=>e===userid)){
            return "requesting"
        }
        return "noone"
    }


    const searchUserName=async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        console.log(search);
        if(search.length){
           const data=await searchUsers(search); 
           if(data){
            data.map((user)=>{
                const status=findStatus(user.id);
                const temp:searchUserList={
                    status:status,
                    userData:user
                }
                setUsersList((e)=>[...e,temp]);
            });
           }
        }



        setSearch("");
    }
    const handleSearchChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value);
    }
    const keyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==='Enter'){
            //@ts-ignore
            searchUserName(e);
        }
    }
    return (
        <>
            <div  className="bg-[#1c1c24] w-full col-span-7 flex flex-col items-center ">
                <div className="flex justify-start items-center mt-5">
                    <Search className="text-white h-6 w-6 mt-1 " />
                    <div className="text-lg text-white mt-2 ml-2" > Search for Users Globally</div>
                </div>
                <div className=" flex items-center justify-between text-sm mt-5 w-11/12  bg-zinc-800  rounded-full">
                    <input type="text" onChange={(e)=>handleSearchChange(e)} onKeyDown={keyDown} value={search} className="focus:outline-none p-3 ml-5 bg-transparent text-slate-300 text-lg font-normal" placeholder="Search..." />
                    {/* <div className=""></div> */}
                    <div onClick={(e:any)=>searchUserName(e)} className="bg-slate-600 hover:bg-slate-500 rounded-full mr-1 h-[2.8rem] w-[2.8rem] flex item-center justify-center ">
                        <Search className="text-white h-7 w-7 my-auto" />
                    </div>
                </div>
                <div style={{overflow: "auto", scrollbarWidth: "none"}} className="h-full  my-3 w-11/12 rounded-xl mx-5 bg-zinc-700 overflow-y-scroll overflow-x-hidden">
                    {
                        !(usersList.length)?<div className=" mx-4 my-4 text-white font-light">
                            No user Found...</div>:
                                usersList.map((user:searchUserList)=>{
                                    return(
                                        <SearchUserCard key={user.userData.id} status={user.status} userId={user.userData.id} Bio={user.userData.Bio} userName={user.userData.username} profilePic={user.userData.profilePictureURL} />
                                    );
                                })
                    }  
                </div>
            </div>
        </>

    );
}

export default SearchUsers;