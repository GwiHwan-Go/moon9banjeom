import { gql, makeVar, useQuery, useReactiveVar, useMutation } from "@apollo/client";
import React, { useState }  from "react";
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { useRoute } from '@react-navigation/native';
import EndAlert from "../components/EndAlert";

const MARK_SEEN_MUTATION = gql`
    mutation markSeen($id:Int!){
      markSeen(id: $id){
          ok
          error
      }
    }
`
const PHOTO_RECOMMEND = gql`
  query getAdjacents{
    getAdjacents
  }
`;
const PHOTO_QUERY = gql`
  query seePhoto( $list : [Int], $offset: Int!) {
    seePhoto(list: $list, offset: $offset) {
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
//{getAdjacents : photoList},
export default function Feed({navigation}) {
  const updateMarkSeen = (cache, result) => {
    const {data : {markSeen : {ok}}} = result;
    if (ok){
      const userId = `User:${userData?.me?.id}`;
      console.log(userId)
      cache.modify({
        id: userId,
        fields: {
          seenNumber(prev){
            return prev+1
          }}
      })
    }
  }
  const [markSeenMutation]=useMutation(MARK_SEEN_MUTATION);
  const { data : recommendData, loading} = useQuery(PHOTO_RECOMMEND)
  const photoList = recommendData?.getAdjacents
  const { data : userData } = useMe();
  const { data, loading : renderingPhoto, refetch, fetchMore} = useQuery(PHOTO_QUERY, {
    variables : {
      offset : 0,
      list : photoList,
    }
  })
  
  const renderPhoto = ({item:photo})=> {
    return (
    <Photo 
      {...photo}
    />
      )
  }
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.1}
        onEndReached={async() =>
          { const index = data?.seePhoto?.length-1;
            const photoId = data?.seePhoto[index]?.id
            markSeenMutation({
              variables : { 
                id : photoId
              },
              update : updateMarkSeen
            });
            if (photoList.length===index+1){ //when photoList ended
              console.log('list ended');
              return Alert.alert(
                "Congraturations!!",
                "You've seen All pharases we preapred for you.\n It's time to share your treasure for us",
                [
                  {
                    text: "Share mine",
                    onPress: () => navigation.navigate('Camera'),
                    style: "cancel",
                  },{
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel",
                  },
                ],
                {
                  cancelable: true,
                  onDismiss: () =>null,
                }
              );
            }
            return fetchMore({
              variables: {
                list: photoList,
                offset: data?.seePhoto?.length
              },
            })
          }
        }
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