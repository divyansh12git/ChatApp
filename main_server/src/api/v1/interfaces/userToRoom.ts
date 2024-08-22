type room={
    id?:number
    userId:number,
    rooms: number[],
    requested:number[],
    requesting:number[]
}
type request={
    myId:number,
    userId:number,
    status:Boolean
}

interface IUserToRoom{
    getUserToRoomData(myId:number):Promise<room|null>;
    createUserToRoom(data:room):Promise<number>;
    deleteRoom(id:number):Promise<Boolean>;
    addRequested({myId,userId}:{myId:number,userId:number}):Promise<Boolean>;
    addRequesting({myId,userId}:{myId:number,userId:number}):Promise<Boolean>;
    addRooms({myId,userId}:{myId:number,userId:number}):Promise<Boolean>
    removeRequested(data:request):Promise<Boolean>;
    removeRequesting(data:request):Promise<Boolean>;
    removeRoom({myId,userId}:{myId:number,userId:number}):Promise<Boolean>;
}
export{
    IUserToRoom,room
}