import {gql} from "apollo-server";

export default gql `
    type User{
        id: Int!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        seen: [Seen]
        seenNumber: Int!
        createdAt: String!
        updatedAt: String!
        bio: String
        avatar: String
        photos: [Photo]
        uploadedNumber: Int!
        likes: [Like]
        likesNumber: Int!
        isMe: Boolean!
    }
`