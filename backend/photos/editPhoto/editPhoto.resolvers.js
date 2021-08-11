import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

export default{
    Mutation: {
        editPhoto: protectedResolver(async(_,{id, caption},{loggedInUser})=>{
            const oldPhoto = await client.photo.findFirst({
                where: {
                    id,
                    userId:loggedInUser.id,
                },
            });
            if(!oldPhoto){
                return {
                    ok: false,
                    error: `Can't find photo, you are ${loggedInUser.username}`

                }
            }
            await client.photo.update({
                where: {
                    id
                },
                data: {
                    caption,
                }
            })
            return {
                ok: true
            }
        })
    }
}