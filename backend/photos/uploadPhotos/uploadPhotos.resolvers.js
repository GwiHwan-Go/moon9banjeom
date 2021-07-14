import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(async(_,{file, caption},{loggedInUser})=>{
            
            const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
            
                return client.photo.create({
                    data: {
                        file: fileUrl,
                        caption,
                        user : {
                            connect: {
                                id: loggedInUser.id
                            }
                        },
                }})
                            
                        })
                    
                }
            }
            
            //save the photo with the parsed hasgtags
            // add the photo to the hashtags
