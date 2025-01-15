

const NormalBox=({action}:{action:string})=>{

    return (
        <div className="flex justify-center border border-white w-[5rem]  h-1/3 rounded-lg items-center gap-3 px-1 ">
            <div className="p-4 text-white font-light text-sm">{action}</div>
        </div>
    );
}

export default NormalBox