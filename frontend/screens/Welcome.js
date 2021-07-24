import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";



const LoginLink = styled.Text`
  color: ${colors.blue};
  font-size : 18px;
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;
const SeeLink = styled.Text`
  color: white;
  font-size : 15px;
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

export default function Welcome({ navigation }) {
    
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogIn = () => navigation.navigate("LogIn");
    const goToLoggedInNav = () => navigation.navigate("LoggedInNav");
    
    return (
    <AuthLayout>
        <AuthButton
          text="새 계정 만들기"
          disabled={false}
          onPress={goToCreateAccount}
        />
        <TouchableOpacity onPress={goToLogIn}>
            <LoginLink>로그인</LoginLink>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToLoggedInNav}>
            <SeeLink>둘러 보기</SeeLink>
        </TouchableOpacity>
    </AuthLayout>
    );
    }