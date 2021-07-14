
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

const PORT = process.env.PORT;

export default {
    Mutation: {
        editProfile: protectedResolver(
            async (_, {
            firstName,
            lastName,
            username,
            email,
            password:newPassword,
            bio,
            avatar
        }, {loggedInUser}) => {
            let avatarUrl = null;
            if(avatar){
                console.log("befor s3", avatar, loggedInUser.id)
                avatarUrl = await uploadToS3(avatar, loggedInUser.id, `${loggedInUser.username}'s avatars`);
                
            // *To upload file to server*
            //     const {filename, createReadStream} = await avatar;
            //     const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
            //     const readStream = createReadStream();
            //     const writeStream = createWriteStream(process.cwd()+"/uploads/"+newFilename);
            //     readStream.pipe(writeStream);
            //     avatarUrl = `http://localhost:${PORT}/static/${newFilename}`;
            }
            let uglyPassword = null;
            if(newPassword){
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }
            const updatedUser = await client.user.update({
                where: {
                    id:loggedInUser.id
                },
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    ...(uglyPassword && {password: uglyPassword}),
                    ...(avatarUrl && {avatar: avatarUrl}),
                    bio,

                }
            });
            if (updatedUser.id){
                return {
                    ok: true
                }
            }else{
                return {
                    ok: false,
                    error: "Could not update your profile"
                }
            }
        }
        )}
}