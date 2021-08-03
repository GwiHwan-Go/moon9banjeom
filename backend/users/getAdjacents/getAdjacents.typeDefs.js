import { gql } from "apollo-server";

export default gql`
    type Query {
        getAdjacents: [Int]!
    }
`;