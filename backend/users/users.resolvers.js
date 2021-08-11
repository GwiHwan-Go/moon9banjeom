import client from "../client"

export default{
    User: {
        seenNumber : ({id}) => client.seen.count({
            where : {userId : id}
        }),
        likesNumber : ({id}) => client.like.count({
            where : {userId : id}
        }),
        uploadedNumber : ({id}) => client.photo.count({
            where : {userId : id}
        }),
    }
}