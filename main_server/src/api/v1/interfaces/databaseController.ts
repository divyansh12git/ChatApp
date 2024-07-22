import { User } from "./types";

//Strategy Pattern

//object
interface userStrategy {
    execute(arg: User | string): Promise<User> | Promise<Array<User>> | Promise<Boolean>;
}


// Behaviors interface
interface IUpdateUser{
    execute(username:string):Promise<Boolean>;
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
export{IDeleteUser,IGetAllUsers,IGetUser,IMutateUser,IUpdateUser,userStrategy}