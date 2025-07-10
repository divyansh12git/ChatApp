'use client'
import {useState,useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { redirect } from 'next/navigation'
import {updatePersonalInformation} from "@/lib/store/slice/personalInformation"
import {DecryptData,verifyToken} from "@/lib/services"
import {getUserData} from "@/lib/services/api"
import {update} from "@/lib/store/slice/username";
import { LoadingPage } from "@/components/custom";
import { useRouter } from "next/navigation";
export default  function Home() {
  // redirect(`/chat`);
    const dispatch = useDispatch()
    const router=useRouter();
    
	useEffect(() => {
		const token = localStorage.getItem('token');

		if (!token) {
			router.push("/auth");
			return;
		}

		try {
			const username = verifyToken(token);
			dispatch(update({ username }));

			if (username) {
				router.push('/chat');
			} else {
				router.push('/auth');
			}
		} catch (err) {
			console.error("Error verifying token:", err);
			router.push('/auth');
		}
	}, [dispatch, router]);


    // console.log(token)
    return(
    <LoadingPage title="Welcome To ChatApp Please Wait..." />
    
    
    );
  
}
