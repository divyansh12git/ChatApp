export const typedef=`
    type User{
        id: ID!
        name: String!
        username: String!
        friends: Int
        requested: Int
        number_of_posts: Int
        profilePictureURL:String
        Bio: String
    }
    type UserToRoom{
        roomID: String!
        friendID: Int!,
    }
    type getAllUsersResponse{
        id:Int!,
        name:String,
        username:String!,
        profilePictureURL:String,
        Bio:String,
    }
    type requestRequestingList{
        request:[Int],
        requesting:[Int]
    }
    input createUserInput{
        name: String!
        username: String!
        password: String!
    }
    input updateUser{
        username: String!
        value: String!
        updateId:Int!
    }

`;