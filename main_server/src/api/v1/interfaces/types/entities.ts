

type User={
    name:string,
    username:string,
    email:string,
    password:string,
    followers?:number,
    following?:number,
    number_of_posts?:number,
    profilePictureURL:string,
    Bio?:string
}

type Messgage={
    sender:String,
    receiver:String,
    data:String;
    time:Date
}


export {
    User,Messgage
}