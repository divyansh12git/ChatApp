'use client'
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from 'next/navigation'

const Logout=()=>{

    const LogOutHandler=(e:any)=>{
        console.log("YO");
        e.preventDefault();
            localStorage.removeItem('token');
            // window.location.reload();
            // return redirect('/auth');
    }

    return (
        <div  className="hover:bg-[#ffffff18]  w-12 h-12 flex justify-center items-center rounded-full" >
            <Link href={'/auth'}>
                <LogOutIcon onClick={(e)=>LogOutHandler(e)} className="text-white h-[2rem] w-auto" />
            </Link> 

        </div>
    );
}

export default Logout;