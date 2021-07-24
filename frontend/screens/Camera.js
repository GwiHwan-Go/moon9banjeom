import React from "react";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";


const DevelopingText = styled.Text`
    font-size: 50px;
    color : white;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
`;
export default function Camera({ loading, children }) {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        <DevelopingText>Developing...</DevelopingText>
        <ActivityIndicator size="large" color="white" />
    </View>
  );
}