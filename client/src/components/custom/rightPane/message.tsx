

const MessageBox=({sender,message,time}:{sender:boolean,message:string,time:string})=>{
    return (
        <div className={` flex flex-col rounded-lg text-ellipsis overflow-hidden ${sender?"self-end":"self-start"}  ${sender?"bg-blue-500":"bg-zinc-700"} w-max  h-auto py-2 px-4 my-3 mx-5 `}>
            <p className="text-lg font-md self-start text-white"> {message}</p>
            <p className="text-xs font-md self-end text-white"> {time} </p>
        </div>
    );
}
export default MessageBox;