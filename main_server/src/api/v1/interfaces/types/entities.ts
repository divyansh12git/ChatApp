

type User={
    id?:number,
    name:string,
    username:string,
    password:string,
    friends?:number,
    requested?:number,
    number_of_posts?:number,
    profilePictureURL:string,
    Bio?:string
}
type UserStoredInDB={
    name:string,
    username:string,
    password:string,
    followers:number,
    following:number,
    number_of_posts:number,
    profilePictureURL:string,
    Bio:string
}

type Messgage={
    sender:String,
    receiver:String,
    data:String;
    time:Date
}


export {
    User,Messgage,UserStoredInDB
}