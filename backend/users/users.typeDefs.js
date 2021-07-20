import {gql} from "apollo-server";

export default gql `
    type User{
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        seen: [Seen]
        createdAt: String!
        updatedAt: String!
        bio: String
        avatar: String
        photos: [Photo]
        likes: [Like]
        isMe: Boolean!
    }
`