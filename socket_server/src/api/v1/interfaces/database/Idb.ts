import Database from "../../services/database"

type Message={
    id?: number,
    authorId: number,
    time: string,
    room? :Room,
    roomId: number,
    content:string
}
type Room={
    id?: number,
    roomName: string,
    createdAt: string,
    createdBy: number,
    users: number[],
    message: Message[]
}
interface IRoomDB{
    createRoom(data:Room):Promise<number>;
    deleteRoom({roomId,userId}:{roomId:number,userId:number}):Promise<Boolean>;//room,user performing action
    searchRoomById(roomId:number):Promise<Room|null>
    addUserToRoom({roomId,userToAddId}:{roomId:number,userToAddId:number}): Promise<Boolean>;
    getUsersInRoom(roomId:number):Promise<number[] | []>
    removeUserFromRoom({roomId,userToRemoveId,userRemovingId}:
                    {roomId:number,userToRemoveId:number,userRemovingId:number}): Promise<Boolean>;
}

interface IMessageDB{

    createMessage(data:Message):Promise<number>;
    getMessagesInRoom(roomId:number):Promise<Message[] | []>;
}
export {
    IMessageDB,
    IRoomDB,Message,Room
}