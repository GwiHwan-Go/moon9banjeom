import { gql } from "apollo-server-express";

export default gql`
    type Query{
        seePhotoComments(id:Int!, cursor:Int!) : [Comment]!
    }
`