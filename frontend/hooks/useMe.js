import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      firstName
      lastName
      seen{
        photo{
          id
          file
        }
      }
      avatar
      bio
      likes{
        photo{
          id
          file
        }
      }
      photos{
          id
          file
        }
      }
    }
`;

export default function useMe() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
}