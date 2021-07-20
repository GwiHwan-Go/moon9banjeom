import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{
    Mutation: {
        markSeen: protectedResolver(async (_, {id}, {loggedInUser}) => {
            const photo = await client.photo.findUnique({
                where: {
                    id
                }
            });
            if (!photo){
                return {
                    ok: false,
                    error: "What are you looking now? I can't get the photo",
                }
            }
            const seen = await client.seen.findUnique({
                where : {
                    photoId_userId: {
                        userId: loggedInUser.id,
                        photoId: id,
                    }
                }
            });
            if(seen){
                return {
                    ok: false,
                    error: "you've already seen this"
                }
            }else {
                await client.seen.create({
                    data : {
                        user: {
                            connect : {
                                id : loggedInUser.id
                            }
                        },
                        photo : {
                            connect : {
                                id
                            }

                        }
                    }
                })
            }
            return {
                ok : true
            }
        })
    }
}