//Strategy Pattern


import { User } from "./types";

//object
interface userStrategy {
    execute(arg: User | string): Promise<User> | Promise<Array<User>> | Promise<Boolean>;
}


// Behaviors interface
interface IUpdateUser{
    execute(username:string,user:User):Promise<Boolean>;
}
interface IGetUser{
    execute(username:string):Promise<User>;
}
interface IGetAllUsers{
    execute(condition:string):Promise<Array<User>>;
}
interface IDeleteUser{
    execute(username:string):Promise<Boolean>;
}
interface IMutateUser{
    execute(user:User):Promise<Boolean>;
}
interface IGetUserById{
    execute(id:string):Promise<User>;
}
export{IDeleteUser,IGetAllUsers,IGetUser,IMutateUser,IUpdateUser,userStrategy,IGetUserById}