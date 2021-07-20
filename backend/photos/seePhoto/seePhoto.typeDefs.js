import { gql } from "apollo-server";

export default gql`
    type Query {
        seePhoto(offset: Int!) : [Photo]!
    }
`;