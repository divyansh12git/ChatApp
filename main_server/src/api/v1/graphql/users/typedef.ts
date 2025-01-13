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

    input createUserInput{
        name: String!
        username: String!
        password: String!
    }
    input updateUser{
        findUser:String!
        name: String
        username: String
        password: String
        friends: Int
        requested: Int
        number_of_posts: Int
        profilePictureURL:String
        Bio: String
    }
`;