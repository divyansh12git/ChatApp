'use client'
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
const Logout = () => {
    const router = useRouter();

    const LogOutHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        toast.loading("Logging out...",{duration:2000});
        localStorage.removeItem("token");
        router.push("/auth");
    };

    return (
        <>
            <Toaster />
            <div
            onClick={LogOutHandler}
            className="hover:bg-[#ffffff18] w-12 h-12 flex justify-center items-center rounded-full cursor-pointer"
            >
            <LogOutIcon className="text-white h-[2rem] w-auto" />
            </div>
        </>
    );
};

export default Logout;
