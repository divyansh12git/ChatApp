import Database from "../../services/database"

type Message={
    id?: number,
    authorId: number,
    time: string,
    room :Room,
    roomId: number
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
    Client:Database;
    createRoom(data:Room):Promise<number>;
    deleteRoom({roomId,userId}:{roomId:number,userId:number}):Promise<Boolean>;//room,user performing action
    searchRoomByName(roomName:string):Promise<Room>
    addUserToRoom({roomId,userToAddId}:{roomId:number,userToAddId:number}): Promise<Boolean>;
    removeUserFromRoom({roomId,userToRemoveId,userRemovingId}:
                    {roomId:number,userToRemoveId:number,userRemovingId:number}): Promise<Boolean>;
}

interface IMessageDB{
    Client:Database;
    createMessage(data:Message):Promise<number>;
    getMessage(roomId:number):Promise<Message>;
}
export {
    IMessageDB,
    IRoomDB,Message,Room
}