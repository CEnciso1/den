import { View } from "react-native";
import React from "react";
import { Button } from "react-native";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signOut } from "firebase/auth";

const LogOut = ({ navigation }) => {
  const handleLogOut = () => {
    try {
      signOut(FIREBASE_AUTH);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="w-3/4 rounded-xl bg-sky-200">
      <Button onPress={handleLogOut} title="Sign Out" color="black" />
    </View>
  );
};

export default LogOut;
