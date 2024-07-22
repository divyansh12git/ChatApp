type SignUpRequest={
    name:String,
    username:String,
    email:String,
    password:String
}
type SignInRequest={
    username:String,
    password:String
}

export {SignUpRequest,SignInRequest}