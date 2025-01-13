'use client'

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import DefaultMessage from "./default";
import DynamicMessagingArea from "./dynamic"

export default function RightComponent() {

    const currentFriend=useSelector((state:RootState)=>state.currentFriend);

    if(currentFriend.id==-1)
        return (
            <DefaultMessage />
    );
    return (
        <DynamicMessagingArea />
    );

    
}