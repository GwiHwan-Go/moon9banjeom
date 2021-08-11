import React from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';


export default function EndAlert(){
    // const navigtation = useNavigation();
    // console.log(navigation)
    console.log('in alert')
    return Alert.alert(
        "Congraturations!!",
        "You've seen All pharases we preapred for you.\n It's time to share your treasure for us",
        [
          {
            text: "Share mine",
            onPress: () => null,
            style: "cancel",
          },{
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              "This alert was dismissed by tapping outside of the alert dialog."
            ),
        }
      );
    }