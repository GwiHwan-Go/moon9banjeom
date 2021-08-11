import { gql } from "apollo-server";

export default gql`
    type Query{
        seeLikedPhoto(offset:Int) : [Photo]
    }
    `;