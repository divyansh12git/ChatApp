'use client'
import {useState,useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { redirect } from 'next/navigation'
import {updatePersonalInformation} from "@/lib/store/slice/personalInformation"
import {DecryptData,verifyToken} from "@/lib/services"
import {getUserData} from "@/lib/services/api"
import {update} from "@/lib/store/slice/username";
import { LoadingPage } from "@/components/custom";
export default  function Home() {
  // redirect(`/chat`);
    const dispatch = useDispatch()
    useEffect(() => {
      // This will run only on the client-side
      const token = localStorage.getItem('token');
      // console.log(token);

      return ()=>{
        if (!token) {
          return redirect(`/auth`);
        }        
        // console.log(token);
        try {
          // Verify the token
          const username=verifyToken(token);
          console.log(username);
          // console.log(data)
          dispatch(update({username:username}));
          if(username!=null){
              return redirect('/chat');
          }

        } catch (err) {
          console.log("Hi from error")
          //@ts-ignore
          if(err.message === "NEXT_REDIRECT")redirect('/chat');
          console.log(err);
          
        }
        return redirect(`/auth`);
      }
    }, []);

    // console.log(token)
    return(<LoadingPage title="Welcome To ChatApp Please Wait..." />)
  
}
