import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query : {
        seeSeenPhoto: protectedResolver(async(_,{offset},{loggedInUser}) => {
            const seenlist =  await client.seen.findMany({
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
            return seenlist.map(element=>element.photo)
        })
    }
}