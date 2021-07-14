import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        deletePhoto: protectedResolver(async(_,{id},{loggedInUser})=> {
            const photo = await client.photo.findUnique({
                where : {
                    id
                },
                select: {
                    userId: true
                }
            });
            if (!photo){
                return {
                    ok : false,
                    error : `photo not found, the photo you requested id is ${id}?`
            }}else if(photo.userId!==loggedInUser.id){
                return {
                    ok: false,
                    error : `this photo belongs to user : ${photo.userId}, you are not authorized`
                }}else {
                    await client.photo.delete({
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
