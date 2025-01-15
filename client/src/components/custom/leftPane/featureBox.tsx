import Calls from "./features/searchUsers";
import Messages from "./features/message";
import Settings from "./features/profile";
import Groups from "./features/friends";
import { UserProvider } from "@/lib/context/leftpane";
function FeatureBox (props:any) {
    if(props.index===0)
        return <UserProvider><Messages /></UserProvider>
    else if(props.index===1)
        return <Groups />
    else if(props.index===2)
        return <Calls />
    else
        return <Settings />
}

export default FeatureBox;