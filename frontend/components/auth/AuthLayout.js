import React from "react";
import styled from "styled-components/native";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
  } from "react-native";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 20px;
`;

const Logo = styled.Image`
  max-width: 70%;
  width: 100%;
  height: 100px;
  margin: 0 auto;
  margin-bottom: 40px;
`;

export default function AuthLayout({ children }) {
    
  return (
    <DismissKeyboard>
      <Container>
          <KeyboardAvoidingView
              style={{
                  width: "100%",
                          }}
              behavior="position"
              keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
              >
              <Logo
                  resizeMode="contain"
                  source={require("../../assets/logo_dark.png")}
              />
              {children}
          </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
}