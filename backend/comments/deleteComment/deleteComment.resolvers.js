import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        deleteComment: protectedResolver(async(_,{id},{loggedInUser})=> {
            const comment = await client.comment.findUnique({
                where : {
                    id
                },
                select: {
                    userId: true
                }
            });
            if (!comment){
                return {
                    ok : false,
                    error : `comment not found, the comment you requested id is ${id}?`
            }}else if(comment.userId!==loggedInUser.id){
                return {
                    ok: false,
                    error : `this comment belongs to user : ${comment.userId}, you are not authorized`
                }}else {
                    await client.comment.delete({
                        where : {
                            id
                        }
                    });
                    return {
                        ok: true
                    }
                }
            })

        }
    }
