import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import CreateAccount from "./Screens/CreateAccount";
import ProfilePage from "./Screens/ProfilePage";
import SignIn from "./Screens/SignIn";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Create" component={CreateAccount} />
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
