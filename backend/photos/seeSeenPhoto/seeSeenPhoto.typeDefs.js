import { gql } from "apollo-server";

export default gql`
    type Query{
        seeSeenPhoto(offset:Int) : [Photo]
    }
    `;