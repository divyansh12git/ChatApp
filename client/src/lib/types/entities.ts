export type User={
    id?:number,
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