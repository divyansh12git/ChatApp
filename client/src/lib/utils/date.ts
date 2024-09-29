
const getDateFormat=()=>{
    const date=new Date();
    const day=date.getDate();
    const month=date.getMonth();
    const year=date.getFullYear();
    const hours=date.getHours();
    const minutes=date.getMinutes();
    const seconds=date.getSeconds();

    return `${hours}:${minutes} ${day}/${month}/${year}`
}
export default getDateFormat;