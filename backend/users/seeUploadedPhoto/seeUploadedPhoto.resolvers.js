import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query : {
        seeUploadedPhoto: protectedResolver(async(_,{offset},{loggedInUser}) => {
            const uploadedlist =  await client.photo.findMany({
                take : 6,
                skip : offset,
                where : {
                    userId : loggedInUser.id
                },
                select : {
                    id : true,
                    file : true,
                }
            })
            return uploadedlist
        })
    }
}