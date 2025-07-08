'use client'
import { useEffect } from "react";
import { LeftPane } from "@/components/custom";
import {RightComponent} from "@/components/custom";
import {SocketProvider} from "@/lib/provider/socket/socketProvider"


export default function Home() {
    


    return(
        <>  
            <SocketProvider>
                <LeftPane />
                <RightComponent />
            </SocketProvider>
        </>

    );
}