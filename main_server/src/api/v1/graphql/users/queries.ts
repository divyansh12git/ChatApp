export const queries=`
        getAllUsers(input:String!):[User]
        getUser(input:String!):User
        getCurrentUser:User
        getFriendsData(userId:Int!):[User]
`;