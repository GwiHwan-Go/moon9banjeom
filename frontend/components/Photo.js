import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Image, ImageBackground, TouchableHighlight, TouchableWithoutFeedback, 
  useWindowDimensions, StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id:Int!){
        toggleLike(id: $id){
            ok
            error
        }
    }
`

const Container = styled.View`
`;
const File = styled.Image`
`;
const ImageContainer = styled.View`
`;
const ExtraContainer =styled.View`
    padding: 10px;
`;
const ICON_SIZE = 120;
const Actions = styled.View`
    flex-direction: row;
    width : 100%;
    height : 100%;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;
const LikeAction = styled.TouchableOpacity`
    align-items: center;
    margin-right: 10px;
`;
const CommentAction = styled.TouchableOpacity`
    align-items: center;
`;
const PhotoContainer = styled.ImageBackground`
  align-items: center;
  justify-content: center;
`;
const Numberbox = styled.Text`
  color: white;
  margin: 7px 0px;
  font-size: 20px;
  font-weight: 600;
`;
const Icons = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.Text`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;
function Photo({id, user, caption, file, isLiked, commentNumber,likesNumber }) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height);
  const [touched, setTouched] = useState(false);
  const updateToggleLike = (cache, result) => {
    console.log(ok,error)
    const {data : {toggleLike : {ok}}} = result;
    if (ok){
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev){
            return !prev
          },
          likesNumber(prev){
            if(isLiked){
              return prev-1;
            }else {
              return prev+1;
          }
        }}
      })
    }
  }
  const [toggleLikeMutation, {ok, error}]=useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
        id,
    },
    update: updateToggleLike,
  });
  const setActionOpacity = (action) => action ? {opacity : 0} : {opacity : 1}
  return ( //imageloader
    <Container>
        <TouchableHighlight onPress = {()=>{
              return setTouched(!touched)}}>
          <PhotoContainer 
            resizeMode="cover"
            style={[{width, height}]}
            source={{ uri: file }}
          >
            <Actions style={setActionOpacity(!touched)}>
              <LikeAction onPress={toggleLikeMutation} disabled={!touched} >
                  <Ionicons 
                      name={isLiked ? "heart" : "heart-outline"} 
                      color={isLiked ? "tomato" : "white"}
                      style={{marginRight: 10}}  
                      size={ICON_SIZE}  />
                  <Numberbox>{likesNumber === 1 ? "1 like" : `${likesNumber} likes`}</Numberbox>
              </LikeAction>
              <CommentAction onPress={()=>{navigation.navigate("Comments")}} disabled={!touched} >
                <Ionicons 
                name="chatbubble-outline" 
                color="white" 
                size={ICON_SIZE} 
                style={{marginRight: 10}} />
                <Numberbox>{commentNumber===1 ? "1 comment" : `${commentNumber} comments`}</Numberbox>
              </CommentAction>
            </Actions>
          </PhotoContainer>
          
        </TouchableHighlight>
    </Container>
      /* /* <ExtraContainer>
        <Actions>
          <LikeAction onPress={toggleLikeMutation}>
              <Ionicons 
                  name={isLiked ? "heart" : "heart-outline"} 
                  color={isLiked ? "tomato" : "white"}
                  style={{marginRight: 10}}  
                  size={32}  />
              <Numberbox>{likesNumber === 1 ? "1 like" : `${likesNumber} likes`}</Numberbox>
          </LikeAction>
          <CommentAction onPress={()=>{navigation.navigate("Comments")}} >
            <Ionicons name="chatbubble-outline" color="white" size={32} style={{marginRight: 10}} />
            <Numberbox>{commentNumber===1 ? "1 comment" : `${commentNumber} comments`}</Numberbox>
          </CommentAction>
        </Actions>
        <Caption>
            <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer> */
  );
}

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  file: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  commentNumber: PropTypes.number.isRequired,
  likesNumber: PropTypes.number.isRequired,
};
export default Photo;
