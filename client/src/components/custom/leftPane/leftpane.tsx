'use client'
import { useState,useRef,useEffect } from "react";

import Appbar from "./appbar";
import FeatureBox from "./featureBox";
function LeftPane(){
    const [index,setIndex]=useState(0);
    const currentStatus=(x:any)=>{
        console.log("hurragh");
        setIndex(x);
    }   
    return (
        <div className="bg-amber-500 col-span-3 h-full grid grid-cols-8">
          <Appbar currentStatus={currentStatus} />
          <FeatureBox index={index} />
          
          
        </div>
    );
};

export default LeftPane;