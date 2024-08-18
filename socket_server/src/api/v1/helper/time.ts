

const getTimeAsString=()=>{
    const now=new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    return istTime;
}
export default getTimeAsString;