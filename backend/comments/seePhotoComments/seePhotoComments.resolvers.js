import client from "../../client"

export default {
    Query: {
        seePhotoComments: async (_, {id, cursor}) => 
            client.comment.findMany({
                where: {
                    photoId: id,
                },
                take: 5,
                skip: cursor ? 1 : 0,
                ...(cursor && {cursor: {id : cursor}})

            })
            

        }
    }