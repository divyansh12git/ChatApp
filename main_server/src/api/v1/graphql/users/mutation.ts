export const mutation=`
    
    


    #update user
    updateUser(input:updateUser):Boolean
    
    #delete user
    deleteUser(input:String!):Boolean

    sendRequest(myId:Int!, userId:Int!):Boolean
    actionOnRequest(myId:Int!, userId:Int!, accept:Boolean! ):Boolean
`;