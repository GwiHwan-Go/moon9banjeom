import { gql, makeVar, useQuery, useReactiveVar, useMutation } from "@apollo/client";
import React, { useState }  from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const MARK_SEEN_MUTATION = gql`
    mutation markSeen($id:Int!){
      markSeen(id: $id){
          ok
          error
      }
    }
`
const PHOTO_QUERY = gql`
  query seePhoto($offset: Int!) {
    seePhoto(offset: $offset) {
      id
      user{
        id
        username
      }
      file
      comments{
        id
      }
      commentNumber
      likesNumber
      isLiked
    }
  }
`;

export default function Feed({ navigation }) {
  //should make usemutation query and mutate when fetch more, I've got id
  const [markSeenMutation, {data : mutationData}]=useMutation(MARK_SEEN_MUTATION);
  const { data, loading, refetch, fetchMore} = useQuery(PHOTO_QUERY, {
    variables : {
      offset : 0,
    },
  });
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const renderPhoto = ({item:photo})=> {
    return (
    <Photo 
    {...photo}/>
      )
  }
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.1}
        onEndReached={() =>
          { const index = data?.seePhoto?.length-1;
            const photoId = data?.seePhoto[index]?.id;
            markSeenMutation({variables : { id : photoId}});
            return fetchMore({
              variables: {
                offset: data?.seePhoto?.length,
              },
            })
          }
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{width:"100%"}}
        showsVerticalScrollIndicator={false}
        data={data?.seePhoto} 
        keyExtractor={item =>""+ item.id}
        horizontal={true}
        renderItem={renderPhoto}
        pagingEnabled={true}  
      />
    </ScreenLayout>
  );
  }