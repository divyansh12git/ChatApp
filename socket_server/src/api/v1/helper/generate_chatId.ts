
export default function generateChatId(senderId:number,receiverId:number){
    const sortedIds = [senderId, receiverId].sort();
    // Concatenate with a delimiter
    return `${sortedIds[0]}_${sortedIds[1]}`;
}