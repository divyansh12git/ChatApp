export const queries=`
        getAllUsers(input:String!):[getAllUsersResponse]
        getUser(input:String!):User
        getCurrentUser:User
        getFriendsData(userId:Int!):[User]
        getUserToRoomData(userId:Int!):[UserToRoom]
`;