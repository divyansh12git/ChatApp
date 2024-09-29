import Calls from "./features/calls";
import Messages from "./features/message";
import Settings from "./features/settings";
import Groups from "./features/groups";

function FeatureBox (props:any) {
    if(props.index===0)
        return <Messages />
    else if(props.index===1)
        return <Groups />
    else if(props.index===2)
        return <Calls />
    else
        return <Settings />
}

export default FeatureBox;