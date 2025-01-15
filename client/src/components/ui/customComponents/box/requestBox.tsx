

const RequestBox=({action,handler}:{action:string,handler:any})=>{

    return (
        <div onClick={handler} className="flex justify-center hover:cursor-pointer  bg-blue-600 hover:bg-blue-500 h-1/3 rounded-lg items-center gap-3 w-[5rem] ">
            <div className="p-4 text-white font-light text-sm">{action}</div>
        </div>
    );
}
export default RequestBox