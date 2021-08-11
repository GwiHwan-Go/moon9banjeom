# Moon9Banjeom FONTEND 
## with REACT-NATIVE

Quick Start
```terminal
$ expo init my-app
$ cd my-app
$ expo start

//if you installed git
$ git clone this_project
```
install ngrok exposer
```terminal
$ ngrok http 4000
```
and edit apollo.js as this

```
const httpLink = createHttpLink({
  // uri: "http://localhost:4000/graphql",
  uri: "{your ngrok http url}/graphql",
});
```
```terminal
$ npm run start
```
run in your Expo Go App on your Iphone

if you are in the same Wi-Fi, use LAN or use TUNNEL


needed module
```terminal
$ expo install expo-app-loading
$ expo install expo-font
$ expo install expo-asset
$ npm install @react-navigation/native
$ expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-    community/masked-view
$ npm install @react-navigation/stack
$ npm i styled-components
$ expo install react-native-appearance
$ npm install @apollo/client graphql
$ npm i @react-navigation/bottom-tabs 
$ expo install @react-native-async-storage/async-storage
$ npm i apollo3-cache-persist
```
