import { gql } from "apollo-server";

export default gql`
    type uploadManyResult{
        ok : Boolean!
        error : String
    }
    type Mutation {
        uploadMany(file:[String]!) : [uploadManyResult!]
    }
`;