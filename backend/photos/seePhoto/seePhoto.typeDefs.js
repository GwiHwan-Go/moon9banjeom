import { gql } from "apollo-server";

export default gql`
    type Query {
        seePhoto(list: [Int], offset: Int!) : [Photo]!
    }
`;