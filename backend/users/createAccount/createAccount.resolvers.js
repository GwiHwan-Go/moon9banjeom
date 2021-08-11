import bcrypt from "bcrypt";
import client from "../../client";

export default {
    Mutation: {
        createAccount: async (_, {
            firstName,
            lastName,
            username,
            email,
            password,
        }) => {
            //check if username or email are already on DB.
            const existingUser = await client.user.findFirst({
                where: {
                    OR: [
                        {
                            username,
                        },
                        {
                            email,
                        },
                    ],
                },
            });
            if(existingUser){
                return {
                    ok: false,
                    error: "This username/email is already taken"
                }
            }
            // hash password
            const uglyPassword = await bcrypt.hash(password, 10);
            
            //save and return the user
            const createdAccount = await client.user.create({
                data: {username,
                    email,
                    firstName,
                    lastName,
                    password: uglyPassword,
                },
            })
            if(createdAccount){
                return {
                    ok: true,
                }
            }else{
            return {
                    ok: false,
                    error: "Can't create account"
                }
            }

        }
    }
            //issue a token and send it to the user
}    

    