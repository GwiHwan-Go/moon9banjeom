import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../apollo";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import { FlatGrid } from 'react-native-super-grid';

const Container = styled.View`
  background-color: black;
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Header = styled.View`
  display : flex;
  width : 100%;
  flex-direction: row;
  align-items: center;
`;
const ProfileBox = styled.View`
  padding : 0px 20px;
  align-items: center;
  justify-content: space-between;
`;
const Avatar = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 75px;
  background-color: #2c2c2c;
`;
const ItemContainer = styled.View`
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-around;
`;
const ItemBox = styled.View`
  display : flex;
  align-items: center;
  margin-right: 20px;
`;
const ItemName = styled.Text`
  color: white;
  font-size: 20px;
`;
const ItemNums = styled.Text`
  color: white;
  font-size: 20px;  
`;
const Bio = styled.View`
  width : 100%;
  align-items: flex-start;
  padding : 5px;
  margin-bottom: 20px;
`;
const BioText = styled.Text`
  color:white;
  font-size: 15px;
`;
const EditProfile = styled.TouchableOpacity`
  padding : 10px;
  width : 90%;
  border-width : 1px;
  border-color: rgba(255, 255, 255, 0.6);
  border-radius : 10px;
  display : flex;
  align-items: center;
`;
const EditProfileText = styled.Text`
  font-size: 15px;
  color : white;
`;
const Username = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 400;
`;
const Row = styled.View`
  flex: 1;
  margin-bottom: 20px;
  font-size: 16px;
  
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
const Grid = styled.View`
  padding : 10px;
  display : flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const GridPhoto = styled.Image`
  height: 100%;
  width: 100%;
  background-color: #2c2c2c;
`;
const GridPhotoContainer = styled.View`
  border-radius: 5px;
  height: 250px;
`;
export default function Me({ navigation }) {
  const { data } = useMe();
  const [tab, setTab]=useState(0);
  const seenPhotos = data?.me?.seen;
  const likedPhotos = data?.me?.likes;
  const uploadedFiles = data?.me?.photos;

  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);
  console.log(tab)
  return (
  <ScreenLayout>
    <Container>
    <Header>
      <ProfileBox>
        <Avatar source={{uri : data?.me?.avatar}} />
        <Username>
          {data?.me?.firstName}
          {"  "}
          {data?.me?.lastName}
        </Username>
      </ProfileBox> 
      <ItemContainer>
        <ItemBox>
          <ItemNums>{data?.me?.seen?.length}</ItemNums>
          <ItemName>Seen</ItemName>
        </ItemBox>
        <ItemBox>
          <ItemNums>{data?.me?.likes?.length}</ItemNums>
          <ItemName>Likes</ItemName>
        </ItemBox>
        <ItemBox>
          <ItemNums>{data?.me?.photos?.length}</ItemNums>
          <ItemName>Upload</ItemName>
        </ItemBox>  
      </ItemContainer>
    </Header>
    <Bio>
      <BioText>{data?.me?.bio}</BioText>
    </Bio>
    <EditProfile onpress={()=>null}>
      <EditProfileText>Edit Profile(developing...)</EditProfileText>
    </EditProfile>
    <PhotoContainer>
      <ButtonBox>
        <SelectButton onPress={()=>setTab(0)}>
          <ButtonText 
          style={tab===0 ? {
            opacity : 1
            } : null}>SEEN</ButtonText>
        </SelectButton >
        <SelectButton onPress={()=>setTab(1)}>
          <ButtonText 
          style={tab===1 ? {
            opacity : 1
            } : null}>LIKES</ButtonText>
        </SelectButton>
        <SelectButton onPress={()=>setTab(2)}>
          <ButtonText 
          style={tab===2 ? {
            opacity : 1
            } : null}>UPLOAD</ButtonText>
        </SelectButton>
      </ButtonBox>
      <FlatGrid
        data = {tab===0 ? seenPhotos : tab===1 ? likedPhotos : uploadedFiles}
        style = {{marginTop:10, flex:1, width:"100%"}}
        spacing = {10}
        itemDimension = {200}
        renderItem = {({item}) => 
        <GridPhotoContainer>
          <GridPhoto 
          source={{uri: tab===2 ? item.file : item.photo?.file}}
          key={tab===2 ? item.id : item.photo?.id} />
        </GridPhotoContainer>
        } />
      {/* <FlatGrid
        data = {seenPhotos}
        style = {{marginTop:10, flex:1, width:"100%"}}
        spacing = {10}
        itemDimension = {200}
        renderItem = {({item}) => 
        <GridPhotoContainer>
          <GridPhoto 
          source={{uri:item.photo?.file}}
          key={item.photo?.id} />
        </GridPhotoContainer>
        } /> */}

      {/* <Grid>
        {seenPhotos.map(({photo : {file, id}})=>
          <GridPhoto 
          source={{uri:file}}
          key={id} />
        )}
      </Grid> */}
        
      
    </PhotoContainer>
    </Container>
  </ScreenLayout>
  );
}


