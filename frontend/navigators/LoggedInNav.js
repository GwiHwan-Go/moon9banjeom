import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import TabIcon from "../components/nav/TabIcon.js";
import StackNavFactory from "./StackNavFactory";
import useMe from "../hooks/useMe";
import Camera from "../screens/Camera.js";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  const {data} = useMe();
  return (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: "white",
      showLabel: false,
      style: {
        borderTopColor: "rgba(255, 255, 255, 0.3)",
        backgroundColor: "black",
      },
    }}
  >
    <Tabs.Screen
      name="Feed"
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon iconName={"md-home"} color={color} focused={focused} />
        ),
      }}
      >
      {() => <StackNavFactory screenName="Feed" />}
    </Tabs.Screen>
    <Tabs.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"camera"} color={color} focused={focused} />
          ),
        }}
      />
    <Tabs.Screen
      name="Me"
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          data?.me?.avatar ? <Image source={{uri:data.me.avatar}} style={{height:20, width:20, borderRadius: 10, ...(focused && {borderColor: "white", borderWidth: 2})}}/> : <TabIcon iconName={"person"} color={color} focused={focused} />
        ),
      }}
      >
      {() => <StackNavFactory screenName="Me" />}
    </Tabs.Screen>
  </Tabs.Navigator>
);
}