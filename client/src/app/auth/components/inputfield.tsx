import {Input} from "@/components/ui/input"

export default function Inputfield(props:{
    name:string,errorRef:React.RefObject<HTMLParagraphElement>,value:any,handleChange:any}) {
        return (
            <div className="w-full flex flex-col">
                <p ref={props.errorRef} className=" mr-4 text-red-500 font-extralight self-end text-sm"></p>
                <Input  name={`${props.name}`} className="focus:bg-white bg-gray-200 text-black rounded-full h-12 px-5  " value={props.value} placeholder={props.name} onChange={(e:any)=>props.handleChange(e)} />
            </div>
        );

}