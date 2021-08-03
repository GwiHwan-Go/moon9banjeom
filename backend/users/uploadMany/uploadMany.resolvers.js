import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation : {
        uploadMany : protectedResolver(async(_,{file},{loggedInUser})=>{
            // const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
            let results=[]
            for(let idx=0; idx<file.length; idx++){
                const photo = await client.photo.create({
                    data: {
                        file : file[idx],
                        user : {
                            connect: {
                                id: loggedInUser.id
                            }
                        }
                    }
                })
                results[idx]={};
                if (photo){
                    results[idx]['ok']=true;
                }else{
                    results[idx]['ok']=false;
                    results[idx]['error']=`${idx+1}th photo failed`;
                }
            }
            return results
        }
    )
    }}