import { User } from "../../interfaces/types";
type upinp={
    user:User,
    finduser:string
}

const u=[{
        id: 5,
        name: "Divyansh Gupta",
        username: "_divyansh_8",
        password: "13245789",
        followers: 0,
        following: 0,
        number_of_posts: 0,
        profilePictureURL:"_",
        Bio: "This is me Divyanh gupta"
    },
    {
        id: 6,
        name: "Kashish Verma",
        username: "kash4.ish",
        password: "13245789",
        followers: 0,
        following: 0,
        number_of_posts: 0,
        profilePictureURL:"_",
        Bio: "This is me Kashish Verma"
    },
]

const queries={
    getAllUsers:async(_:any,{input}:{input:string})=>{
        if(input==="*"){
            return u;
        }
        else{
            for(let i=0;i<u.length;i++){
                if(u[i].username.startsWith(input)){
                    return [u[i]];
                }
            }
        }
        return null
    },
    getUser:async(_:any,{input}:{input:String})=>{
        console.log(input);
        for(let i=0;i<u.length;i++){
            console.log(u[i].username);
            if(u[i].username===input){
                return u[i];
            }
        }
        return null;
    }
};

const mutation={
    createUser:async(_:any,{}:{})=>{
        return "Divyansh Gupta";
    },
    updateUser:async(_:any,{input}:{input:any})=>{
        try{
            const {name,username,password,Bio,followers,
                following,number_of_posts,profilePictureURL,findUser}=input;
                console.log(findUser); 
                console.log(input); 
            for(let i=0;i<u.length;i++){
                if(u[i].username===findUser){
                    u[i].name=name || u[i].name;
                    u[i].username=username || u[i].username;
                    u[i].password=password || u[i].password;
                    u[i].Bio= Bio || u[i].Bio;
                    u[i].followers=followers || u[i].followers;
                    u[i].following=following || u[i].following;
                    u[i].number_of_posts=number_of_posts || u[i].number_of_posts;
                    u[i].profilePictureURL=profilePictureURL || u[i].profilePictureURL;
                    console.log(u[i]);
                    return true;
                }
            }
        }
        catch(e){
            console.log(e);
            return false;
        }
    }
};

export const resolvers={queries,mutation};