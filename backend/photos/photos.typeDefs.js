import { gql } from "apollo-server-express";

export default gql`
    type Photo {
        id: Int!
        user: User!
        file: String!
        caption: String
        likesNumber: Int!
        commentNumber: Int!
        comments: [Comment]
        isMine: Boolean!
        isLiked: Boolean!
        createdAt: String!
        updatedAt: String!
    }
    
    type React {
        id: Int!
        howmuch: Int!
        photo: Photo!
        createdAt: String!
        updatedAt: String!
    }

`;