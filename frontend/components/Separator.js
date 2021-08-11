import styled from "styled-components/native";
import React from "react";
import { Text, View } from "react-native";

const SSeparator = styled.View`
  margin: 20px 0px 20px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;

`;
const SText = styled.Text`
    margin: 0px 10px;
    font-size : 12px;
    font-weight: 600;
    color: white;
`;

const SView = styled.View`
    width: 100%;
    height: 1px;
    background-color: white;
`

function Separator(){
    return (
        <SSeparator>
            <SView></SView>
            <SView></SView>
        </SSeparator>
    )
}

export default Separator;