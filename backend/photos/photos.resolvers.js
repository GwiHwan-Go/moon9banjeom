import client from "../client"

export default{
    Photo: {
        user: ({userId}) => {
            return client.user.findUnique({
                where: {id: userId}
            })
        },
        likesNumber : ({id}) => client.like.count({
            where : {photoId : id}
        }),
        commentNumber : ({id}) => client.comment.count({
            where : {photoId: id}
        }),
        comments: ({id}) => client.comment.findMany({
            where : {
                photoId : id,
            },
            include: {
                user: true
            }
        }),
        isMine : ({userId},_,{loggedInUser}) => (loggedInUser? userId === loggedInUser.id : false)
        ,

        isLiked : async ({id},_,{loggedInUser}) => {
            if(!loggedInUser){
                return false;
            }
            const ok = await client.like.findUnique({
                where: {
                    photoId_userId: {
                        photoId:id,
                        userId:loggedInUser.id
                    }
                },
                select: {
                    id:true
                }
            })
            if(ok){
                return true;
            }
            return false;
        },
    },
    }

