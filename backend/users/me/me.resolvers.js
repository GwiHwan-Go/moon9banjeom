import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Query: {
        me: protectedResolver((_,__,{loggedInUser})=> client.user.findUnique({
            where : {
                id: loggedInUser.id,
            },
            include : {
                photos : true,
                seen : {
                    include : {
                        id : true,
                        photo : true,
                    }
                },
                likes : {
                    include : {
                        id : true,
                        photo : true,
                    }
                },
            }
        }))
    }
}