'use client'
import {useState,useEffect} from "react";

import { redirect } from 'next/navigation'
import {} from "@/lib/redux/features/personalInformation"
import {DecryptData,verifyToken} from "@/lib/services"


export default  function Home() {
  // redirect(`/chat`);

    useEffect(() => {
      // This will run only on the client-side
      const token = localStorage.getItem('token');
      // console.log(token);

      return ()=>{
        if (!token) {
          return redirect(`/auth`);
        }        

        console.log(token);
        try {
          // Verify the token
          const tokenData=verifyToken(token);
          console.log(tokenData);
          if(tokenData!=null){
              return redirect('/chat');
          }

        } catch (err) {
          console.log("Hi from error")
          //@ts-ignore
          if(err.message === "NEXT_REDIRECT")redirect('/chat');
          console.log(err);
          
        }
        return redirect(`/chat`);
      }
    }, []);

    // console.log(token)
      
  
}
