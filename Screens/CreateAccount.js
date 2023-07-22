import {
  TextInput,
  View,
  Text,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { db } from "../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const CreateAccount = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [validationAlert, setValidationAlert] = useState();
  const [showEmail, setShowEmail] = useState(true);
  const [showName, setShowName] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const emailInput = () => {
    const validateEmail = () => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        setValidationAlert(
          "Invalid Email, please enter a valid email address."
        );
        setError(true);
        return false;
      } else {
        setValidationAlert("Success, email is valid!");
        setError(false);
        return true;
      }
    };

    const handleEmail = () => {
      if (validateEmail()) {
        setShowEmail(false);
        setShowPassword(true);
      }
    };

    return (
      <View className="relative items-center bottom-5">
        <Text className="font-bold text-2xl">Email</Text>
        <View>
          <TextInput
            onChangeText={setEmail}
            value={email}
            className="border 
            p-10 rounded-md mt-2"
            keyboardType="email-address"
            fontSize={20}
            color="black"
            placeholder="email@gmail.com"
          ></TextInput>
        </View>
        <View className="w-3/4 py-5 top-7 rounded-xl bg-sky-200">
          <Button onPress={handleEmail} color="black" title="Next" />
        </View>
      </View>
    );
  };

  const nameInput = () => {
    const handleName = async () => {
      const regex = /^[A-Za-z\s]+$/;
      if (regex.test(name)) {
        setShowName(false);
        setError(false);
        setValidationAlert("Success, name is valid!");
        try {
          console.log(user.uid);
          await setDoc(doc(db, "users", user.uid), {
            name: name,
          });
          console.log("new user");
          navigation.navigate("Profile");
        } catch (error) {}
      } else {
        setError(true);
        setValidationAlert("Error, name is invalid!");
      }
    };
    return (
      <View className="relative items-center bottom-5">
        <Text className="font-bold text-2xl">Name</Text>
        <View>
          {user && <Text>{user.uid}</Text>}
          <TextInput
            onChangeText={setName}
            value={name}
            className="border 
            p-10 rounded-md mt-2"
            fontSize={20}
            color="black"
            placeholder="name"
          ></TextInput>
        </View>
        <View className="w-3/4 py-5 top-7 rounded-xl bg-sky-200">
          <Button onPress={handleName} color="black" title="Next" />
        </View>
      </View>
    );
  };

  const passwordInput = () => {
    const handlePassword = async () => {
      if (password.length >= 6) {
        setShowPassword(false);
        setShowName(true);
        setError(false);
        setValidationAlert("Success, password is valid!");
        try {
          const response = await createUserWithEmailAndPassword(
            FIREBASE_AUTH,
            email,
            password
          );
          setUser(response.user);
        } catch (error) {
          console.log(error);
        }
      } else {
        setValidationAlert("Error, password is invalid!");
        setError(true);
      }
    };

    return (
      <View className="relative items-center bottom-5">
        <Text className="font-bold text-2xl">Password</Text>
        <View>
          <TextInput
            onChangeText={setPassword}
            value={password}
            className="border 
            p-10 rounded-md mt-2"
            fontSize={20}
            color="black"
            placeholder="password"
          ></TextInput>
        </View>
        <View className="w-3/4 py-5 top-7 rounded-xl bg-sky-200">
          <Button onPress={handlePassword} color="black" title="Next" />
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="h-screen bg-sky-500 ">
        <View className="justify-center h-5/6 top-20 bg-white rounded-3xl mx-5 flex">
          <View>
            {validationAlert && (
              <View
                className={`absolute w-5/6 self-center bottom-32 mx-4 z-10 py-3 px-2 rounded ${
                  error ? "bg-red-300" : "bg-green-300"
                }`}
              >
                <Text className="text-center font-bold last:text-base">
                  {validationAlert}
                </Text>
              </View>
            )}
          </View>
          {showEmail && emailInput()}
          {showPassword && passwordInput()}
          {showName && nameInput()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateAccount;
