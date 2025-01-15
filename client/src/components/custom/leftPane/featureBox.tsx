import Requests from "./features/requests";
import Messages from "./features/message";
import Profile from "./features/profile";
import Search from "./features/search";
import { UserProvider } from "@/lib/context/leftpane";
function FeatureBox (props:any) {
    if(props.index===0)
        return <UserProvider><Messages /></UserProvider>
    else if(props.index===1)
        return <Search />
    else if(props.index===2)
        return <Requests />
    else
        return <Profile />
}

export default FeatureBox;