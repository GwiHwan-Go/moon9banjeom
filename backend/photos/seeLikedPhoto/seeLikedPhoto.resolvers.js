import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query : {
        seeLikedPhoto: protectedResolver(async(_,{offset},{loggedInUser}) => {
            const likedlist =  await client.like.findMany({
                take : 6,
                skip : offset,
                where : {
                    userId : loggedInUser.id
                },
                select : {
                    photo : {
                        select : {
                            id : true,
                            file : true
                        }
                    }
                },
                orderBy : {
                    createdAt : "asc"
                }
            })
            return likedlist.map(element=>element.photo)
        })
    }
}