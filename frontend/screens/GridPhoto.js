import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, FlatList, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { FlatGrid } from 'react-native-super-grid';
import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";

const SEEN_QUERY = gql`
  query seeSeenPhoto($offset: Int) {
    seeSeenPhoto(offset: $offset) {
      id
      file
  }}
`;
const LIKED_QUERY = gql`
  query seeLikedPhoto($offset: Int) {
    seeLikedPhoto(offset: $offset) {
      id
      file
  }}
`;
const UPLOADED_QUERY = gql`
  query seeUploadedPhoto($offset: Int) {
    seeUploadedPhoto(offset: $offset) {
      id
      file
  }}
`;

const Grid = styled.Image`
    height: 100%;
    width: 100%;
    background-color: #2c2c2c;
`;
const GridContainer = styled.View`
    border-radius: 5px;
    height: 250px;
`;
const PhotoContainer = styled.View`
  margin-top : 30px;
  flex : 1;
  width : 100%;
  height : 100%;
  align-items : center;
`;
const ButtonBox = styled.View`
  
  display : flex;
  width : 100%;
  flex-direction: row;
  justify-content: space-around;
`;
const SelectButton = styled.TouchableOpacity`
`;
const ButtonText = styled.Text`
  opacity : 0.3;
  color : white;
`;
export default function GridPhoto(){
  const [tab, setTab]=useState(0);
  const { data : seenData,loading, refetch : fetchSeen, fetchMore : seenfetch} = useQuery(SEEN_QUERY, {
      variables : {
        offset : 0,
      },
  });
  const { data : likedData, refetch : fetchLike, fetchMore : likedfetch} = useQuery(LIKED_QUERY, {
      variables : {
          offset : 0,
      },
  });
  const { data : uploadedData, refetch : fetchUpload, fetchMore : uploadedfetch} = useQuery(UPLOADED_QUERY, {
      variables : {
          offset : 0,
      },
  });
  return (
    <PhotoContainer>
      <ButtonBox>
        <SelectButton 
        onPress={
          async()=>{
            setTab(0)
            await fetchSeen();
            }}
        >
          <ButtonText 
          style={tab===0 ? {
            opacity : 1
            } : null}>SEEN</ButtonText>
        </SelectButton >
        <SelectButton 
        onPress={
          async()=>{
            setTab(1)
            await fetchLike();
            }}
        >
          <ButtonText 
          style={tab===1 ? {
            opacity : 1
            } : null}>LIKES</ButtonText>
        </SelectButton>
        <SelectButton 
        onPress={
          async()=>{
            setTab(2)
            await fetchUpload();
            }}
        >
          <ButtonText 
          style={tab===2 ? {
            opacity : 1
            } : null}>UPLOAD</ButtonText>
        </SelectButton>
      </ButtonBox>
      {!loading ? (
      <FlatGrid
        data = {tab===0 ? seenData?.seeSeenPhoto : 
          tab===1 ? likedData?.seeLikedPhoto : 
          uploadedData?.seeUploadedPhoto}
        style = {{marginTop:10, flex:1, width:"100%"}}
        onEndReachedThreshold={0.1}
        onEndReached={()=>{
          return loading ? null : (
            tab===0 ? (
              seenfetch({
                variables : {
                  offset: seenData?.seeSeenPhoto?.length,
                }
              }) || null 
            ) : tab===1 ? (
              likedfetch({
                variables : {
                  offset: likedData?.seelikedPhoto?.length,
                }
              }) || null
            ) : (
              uploadedfetch({
                variables : {
                  offset: uploadedData?.seeUploadedPhoto?.length,
                }
              }) || null
            )
          )
        }}
        spacing = {10}
        itemDimension = {200}
        renderItem = {({item}) => 
          <GridContainer>
            <Grid 
              source={{uri: item.file}}
              key={item.id} />
          </GridContainer>
        } />
        ) : (
      <ActivityIndicator 
        size="large" color="white" 
        style={{
          flex : 1,
          justifyContent : "center",
          alignContent :"center"
        }}
      />
    )}
    </PhotoContainer>
     
    )
}
