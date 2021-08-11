import { prisma } from "@prisma/client";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { cosinesim } from "./algorithm";

export default{
   Query : {
       getAdjacents : protectedResolver(async(_,__,{loggedInUser}) => {
           const ARRAY_LENGTH = 50;
           let allUserId = await client.user.findMany({
               select : {
                   id : true,
               }
           });
           let allPhotoId = await client.photo.findMany({
               select : {
                   id : true,
               }
           })
           let seenList = await client.seen.findMany({
               where : {
                   userId : loggedInUser.id,
               },
                select : {
                    photoId : true,
                }
            })
            seenList = seenList.map(obj=>obj.photoId);
            allUserId = allUserId.map(obj=>obj.id) //row_nm
            allPhotoId = allPhotoId.map(obj=>obj.id) //col_nm
            let matrix = []; //row : user, column : photo
            for (let user_idx=0; user_idx<allUserId.length; user_idx++) {
                matrix[user_idx] = new Array(allPhotoId.length).fill(0);
                const likes = await client.like.findMany({
                    where : {
                        userId : allUserId[user_idx]
                    },
                    select : {
                        photoId : true,
                    }
                })
                const likeIdList = likes.map(obj=>obj.photoId);
                for (let idx=0; idx<likeIdList.length; idx++){
                    matrix[user_idx][allPhotoId.indexOf(likeIdList[idx])] = 1;
                }
            }
            // make matrix
            const me_idx = allUserId.indexOf(loggedInUser.id);
            let result = [];
            for (let user_idx=0; user_idx<allUserId.length; user_idx++){
                
                if (user_idx!==me_idx){
                    //where algorithm used
                    result[user_idx] = [allUserId[user_idx], cosinesim(matrix[me_idx], matrix[user_idx]) || 0];
                }
            }
            result = result.filter(Boolean)
            result.sort(function(b, a) {
                return a[1] - b[1];
            }); //result = adjacent users sorted by cosine similarity
            console.log(result);
            let photoList = [];
            let index = 0;
            while (index<result.length && photoList.length<ARRAY_LENGTH){
                const userList = await client.like.findMany({
                    where : {
                        photoId : { 
                            notIn : seenList
                        },  
                        userId : result[index][0]
                    },
                    select : {
                        photoId : true,
                    }
                });
                photoList = [...new Set(
                    [...photoList, ...userList?.map(obj=>obj.photoId)])] //to remove overlapped data 
                index++;
            }
            if (photoList.length<ARRAY_LENGTH){ //when photoList is shorter than desired list length
                let added = await client.photo.findMany({
                    where : {
                        id : {
                            notIn : seenList.concat(photoList)
                        }
                    },
                    take : ARRAY_LENGTH-photoList.length,
                    select : {
                        id : true,
                    }
                });
                added = added.map(obj=>obj.id);
                added.sort(function(a, b) {
                    return a[1] - b[1];
                });
                photoList = photoList.concat(added);
            }//photoList = final recommendation results according to adjacent user's liked list.
            console.log(photoList)
           return photoList
       })
   }
}
//https://stratodem.github.io/pandas.js-docs/#introduction