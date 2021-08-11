import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Me from "../screens/Me";
import { Image} from "react-native";
import Comments from "../screens/Comments";

const Stack = createStackNavigator();

export default function StackNavFactory({ screenName }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTitleAlign : "center",
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
        name={"Feed"}
        component={Feed}
        options={{
          headerShown: false,
          
        }}
      />
      ) : null}
      {screenName === "Me" ? 
      <Stack.Screen 
       options={{
        headerTitle: () => (
          <Image
            style={{
              width: 350,
              height: 30,
              margin: 5,
            }}
            resizeMode="contain"
            source={require("../assets/logo_dark.png")}
          />
        ),
        headerLeft : () => null,}}
        name={"계정 정보"} component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Comments" component={Comments} />

    </Stack.Navigator>
  );
}

