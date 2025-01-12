'use client'
import {useState,useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../lib/store/store';
import { getUserData } from "@/lib/services/api";
import {updatePersonalInformation} from "@/lib/store/features/personalInformation"

export default function chatLayout({
    children,
    message  
  }:{
      children:React.ReactNode,
      message:React.ReactNode
  }){
        const [loading,setLoading]=useState(false);
        const username = useSelector((state: RootState) => state.username.username);
        const dispatch=useDispatch();

        console.log(username);
        console.log("YOYOYOYO");
        useEffect(()=>{
            setLoading(true);

            getUserData(username).then((data:any)=>{
                console.log(data);
                if(data){
                    dispatch(updatePersonalInformation({...data}))
                }
                
            }).finally(()=>setLoading(false));
            
        },[])
       



        {
            if(loading)return(<div>loading...</div>);
            return(
                <>
                <main className="h-[100vh]  ">
                    <div className="h-full bg-[#12132a] grid grid-cols-10">
                        {children}
                        {message}
                    </div>
                </main>
                </>
            );
          
        }
      
  }