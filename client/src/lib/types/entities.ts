export type User={
    id:number,
    name:string,
    username:string,
    friends?:number,
    requested?:number,
    number_of_posts?:number,
    profilePictureURL:string,
    Bio?:string
}

export type Room={
    friendID:number,
    roomID:string
}

export type Message={
    id:number,
    sendByMe:boolean,
    data:string,
    time:string,
}

export type searchUser={
    id:number,
    name:string,
    username:string,
    profilePictureURL:string,
    Bio:string,
}