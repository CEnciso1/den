import {
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  Button,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const SignIn = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState();
  const handleSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      setUser(response.user);
      navigation.navigate("Home");
    } catch (error) {}
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="h-screen bg-sky-500 ">
        <View className="items-center h-5/6 top-20 bg-white rounded-3xl mx-5 flex">
          <View className="mt-44 items-center">
            <Text className="font-bold text-2xl bottom-5">Sign In</Text>
            <TextInput
              className="w-60 text-center text-lg rounded-xl p-10 border "
              placeholder="email@gmail.com"
              onChangeText={setEmail}
            />
            <TextInput
              className="w-60 text-center text-lg rounded-xl p-10 border mt-10"
              placeholder="password"
              onChangeText={setPassword}
            />
          </View>
          <View className="w-3/4 py-5 mt-7 rounded-xl bg-sky-200">
            <Button
              onPress={handleSignIn}
              title="Sign In"
              color="black"
            ></Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
