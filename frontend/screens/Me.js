import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { logUserOut } from "../apollo";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import GridPhoto from "./GridPhoto";

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
  padding : 10px 5px;
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
  height: 100px;
  width: 100px;
  margin-bottom: 5px;
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
  margin-left: 10px;
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
const DEFAULT_AVATAR="https://moon9storage.s3.ap-northeast-2.amazonaws.com/default_images/pngaaa.com-2676909.png"
export default function Me({ navigation }) {
  const { data, loading } = useMe();
  console.log(data);
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);
  return (
  <ScreenLayout loading={loading}>
    <Container>
    <Header>
      <ProfileBox>
        <Avatar source={{uri : data?.me?.avatar ?
        data?.me?.avatar : DEFAULT_AVATAR}} />
        <Username>
          {data?.me?.firstName}
          {"  "}
          {data?.me?.lastName}
        </Username>
      </ProfileBox> 
      <ItemContainer>
        <ItemBox>
          <ItemNums>{data?.me?.seenNumber}</ItemNums>
          <ItemName>Seen</ItemName>
        </ItemBox>
        <ItemBox>
          <ItemNums>{data?.me?.likesNumber}</ItemNums>
          <ItemName>Likes</ItemName>
        </ItemBox>
        <ItemBox>
          <ItemNums>{data?.me?.uploadedNumber}</ItemNums>
          <ItemName>Upload</ItemName>
        </ItemBox>  
      </ItemContainer>
    </Header>
    <Bio>
      <BioText>
        {data?.me?.bio ? 
        data?.me?.bio : 
        "⥥⥥⥥ Who are you? Explain me ⥥⥥⥥"}
        </BioText>
    </Bio>
    <EditProfile onPress={logUserOut}>
      <EditProfileText>Edit Profile(developing...)</EditProfileText>
    </EditProfile>
    <GridPhoto />
    </Container>
  </ScreenLayout>
  );
}

