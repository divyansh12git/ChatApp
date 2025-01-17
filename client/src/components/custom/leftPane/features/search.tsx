import {useState,useEffect, useCallback} from "react";
import {Search } from "lucide-react"
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import SearchUserCard from "../../../ui/customComponents/searchUserCard";
import { updateRequestingList} from "@/lib/store/slice/lists/requestinglist";
import { updateRequestList } from "@/lib/store/slice/lists/requestlist";
import { getLists } from "@/lib/services/api";
import {searchUsers} from "@/lib/services/api";
import { searchUser } from "@/lib/types/entities";
import CustomCard from "@/components/ui/customComponents/customCard";
import { Loader } from "@/components/ui";

interface searchUserList{
    userData:searchUser,
    status:string
}

function SearchUsers () {
    const [search,setSearch]=useState("");
    const [usersList,setUsersList]=useState<searchUserList[]>([]);
    const [loading,setLoading]=useState(false);

    const dispatch = useDispatch();
    const myId=useSelector((state:RootState)=>state.personalInformation).id;
    const friendList=useSelector((state:RootState)=>state.friendlist);
    const requestList=useSelector((state:RootState)=>state.requestList);
    const requestingList=useSelector((state:RootState)=>state.requestingList);

    //copmplete this dispatch??
    useEffect(()=>{
        setLoading(true);
        if((!requestList.length || !requestingList) && myId.length){
            getLists(Number(myId)).then((e)=>{
                console.log(e);
                dispatch(updateRequestList({list:e.request}));
                dispatch(updateRequestingList({list:e.requesting}));
            }).finally(()=>setLoading(false));
        }else{
            setLoading(false);
        }
    },[]);

    const findStatus=(userid:number)=>{
        // console.log(friendList);
        // console.log(requestList);
        // console.log(requestingList);
        // console.log(userid);
        userid=Number(userid);
        if(friendList.some((e)=>Number(e)===userid)){
            return "friend";
        }
        if(requestList.some((e)=>Number(e)===userid)){
            return "request";
        }
        if(requestingList.some((e)=>Number(e)===userid)){
            return "requesting"
        }
        return "noone"
    }


    const searchUserName=useCallback(async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            e.preventDefault();
            setLoading(true);
            // console.log(search);
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
                setLoading(false);
               }
            }else{
                setLoading(false);
            }
            // setSearch("");
        },[search]);
        
    const handleSearchChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(search.length===0){
            setUsersList([]);
        }
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
                {
                    <>
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
                <div style={{overflow: "auto", scrollbarWidth: "none"}} className="h-[33rem]  my-3 w-11/12 rounded-xl mx-5 bg-zinc-700 overflow-y-scroll overflow-x-hidden">
                    {
                        loading?(
                            <div className="h-10 w-10 mx-auto my-10">
                                <Loader />
                            </div>
                        ):!(usersList.length)?<div className=" mx-4 my-4 text-white font-light">
                            No user Found...</div>:
                                usersList.map((user:searchUserList,ind)=>{
                                    return(
                                        <CustomCard key={ind} status={user.status} userId={user.userData.id} Bio={user.userData.Bio} userName={user.userData.username} profilePic={user.userData.profilePictureURL} />
                                    );
                                })
                    }  
                </div>
                    </>
                }
            </div>
        </>

    );
}

export default SearchUsers;