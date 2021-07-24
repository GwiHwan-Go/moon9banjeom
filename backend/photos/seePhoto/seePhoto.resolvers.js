import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{
    Query: {
        seePhoto: protectedResolver((_, {offset},{loggedInUser}) => {
            const photoIdList = loggedInUser.seen.map(element => element.photoId)
            return client.photo.findMany({
                take: 1,
                skip: offset,
                where :  {
                    id : { notIn: photoIdList}
                }
        
            })
})
    }}