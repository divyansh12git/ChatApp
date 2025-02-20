'use client'
import {useState,useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../lib/store/store';
import { getUserData } from "@/lib/services/api";
import {updatePersonalInformation} from "@/lib/store/slice/personalInformation"
import verifyToken from "@/lib/services/tokenVerifier";
import { SocketProvider } from "@/lib/socket/socketProvider";
import {LoadingPage} from "@/components/custom"
export default function chatLayout({
    children
  }:{
      children:React.ReactNode,
  }){
        const [loading,setLoading]=useState(true);
        const token = localStorage.getItem('token');
        let username = useSelector((state: RootState) => state.username.username);
        if(token) username=verifyToken(token);
        const dispatch=useDispatch();

        console.log(username);
        // console.log("YOYOYOYO");
        useEffect(()=>{
            getUserData(username).then((data:any)=>{
                // console.log(data);
                if(data){
                    dispatch(updatePersonalInformation({...data}))
                }
                
            }).finally(()=>setLoading(false));
            
        },[])
       



        {
            if(loading)return(<LoadingPage title="Loading Chats..." />)
            return(
                <>
                <main className="h-[100vh]">
                    <div className="h-full bg-[#12132a] grid grid-cols-10">
                        <SocketProvider>
                            {children}
                        </SocketProvider>
                    </div>
                </main>
                </>
            );
          
        }
      
  }