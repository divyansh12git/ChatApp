import Calls from "./calls";
import Messages from "./message";
import Settings from "./settings";
import Groups from "./groups";

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