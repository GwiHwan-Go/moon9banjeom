import React, { useState } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import ScreenLayout from "../components/ScreenLayout";
const DevelopingText = styled.Text`
    font-size: 50px;
    color : white;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 50px;
`;
const Container = styled.View`
background-color: bl;
`;
const PhotoContainer = styled.ImageBackground`
  align-items: center;
  justify-content: center;
`;
const CameraAction = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
export default function Camera({ loading, children }) {
  const { width, height } = useWindowDimensions();
  const [touched, setTouched] = useState(false);
  console.log(width,height);
  return (
    <ScreenLayout>
      {touched ? (
        <CameraAction onPress={()=>setTouched(!touched)}>
          <Feather name="camera-off" size={100} color="white" />
          <DevelopingText>Developing...</DevelopingText>
          <ActivityIndicator size="large" color="white" />
        </CameraAction>    
      ) : (
        <CameraAction onPress={()=>setTouched(!touched)}>
          <Feather 
            name="camera" size={100} color="white"
          />
          <DevelopingText>Upload photo</DevelopingText>

        </CameraAction>
      )}
      
    </ScreenLayout>
     
    )
  }
    // <View
    //   style={{
    //     backgroundColor: "black",
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   <DevelopingText>Developing...</DevelopingText>
    //   <ActivityIndicator size="large" color="white" />

    // </View>
  
