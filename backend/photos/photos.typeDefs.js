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
        seen: [Seen]
        isMine: Boolean!
        isLiked: Boolean!
        createdAt: String!
        updatedAt: String!
    }
    
    type Like {
        id: Int!
        photo: Photo
        createdAt: String!
        updatedAt: String!
    }

    type Seen {
        id: Int!
        photo: Photo
        user: User!
        createdAt: String!
        updatedAt: String!
    }

`;