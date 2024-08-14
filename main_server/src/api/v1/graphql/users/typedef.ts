export const typedef=`
    type User{
        id: ID!
        name: String!
        username: String!
        password: String!
        followers: Int
        following: Int
        number_of_posts: Int
        profilePictureURL:String
        Bio: String
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
        followers: Int
        following: Int
        number_of_posts: Int
        profilePictureURL:String
        Bio: String
    }
`;