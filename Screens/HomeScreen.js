import { TouchableOpacity, Button, View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ navigation }) => {
  return (
    <View className="h-screen bg-sky-500">
      <View className="h-screen justify-center items-center overflow-auto ">
        <View className="">
          <Text className="font-bold text-2xl">Den</Text>
        </View>
        <View className="top-52 w-5/6">
          <View className="bg-white rounded-full py-2 ">
            <Button
              title="Create Account"
              color="black"
              onPress={() => navigation.navigate("Create")}
            ></Button>
          </View>
          <View className="rounded-full py-2 top-8 bg-transparent border border-white">
            <Button
              className="text-black"
              title="Sign in"
              color="black"
              onPress={() => navigation.navigate("SignIn")}
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
