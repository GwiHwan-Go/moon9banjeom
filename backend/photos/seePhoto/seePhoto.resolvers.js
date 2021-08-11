import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default{
    Query: {
        seePhoto: protectedResolver(async(_, {list, offset},props) => {
            if (list.length<1){
                return null 
            }
            const photolist = await client.photo.findMany({
                take: 1,
                skip: offset,
                where :  {
                    id : { in : list}
                }
        
            })
            return photolist
})
    }}
