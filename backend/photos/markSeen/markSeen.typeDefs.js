import { gql } from "apollo-server-express";

export default gql`
    type markSeenResult{
        ok: Boolean!
        error: String
    }
    type Mutation{
        markSeen(id:Int!): markSeenResult!
    }`