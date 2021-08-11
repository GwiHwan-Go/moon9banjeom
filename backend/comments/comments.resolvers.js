export default {
    Comment: {
        isMine : ({userId},_,{loggedInUser}) => 
        (loggedInUser? userId === loggedInUser.id : false)
    }
}