interface SignInCredentials{
    username:String,
    password:String
}
interface SignUpCredentials{
    username:String,
    password:String,
    name:String
}
export {
    SignInCredentials,
    SignUpCredentials
}