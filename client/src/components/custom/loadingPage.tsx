import Loader from "../ui/loader"
import ThreeBodyLoader from "./threeBodyLoader"
const LoadingPage=({title}:{title:string})=>{ 
    return(
        <div className="h-[100vh] w-[100vw] bg-[#18171d] flex flex-col gap-5 justify-center items-center" >
            <ThreeBodyLoader />
            <h1 className="text-white text-4xl ">{title}</h1>
        </div>
    );
}
export default LoadingPage