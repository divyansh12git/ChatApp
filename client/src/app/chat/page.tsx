'use client'

import { LeftPane } from "@/components/custom";
import {RightComponent} from "@/components/custom";
import {SocketProvider} from "@/lib/socket/socketProvider"

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