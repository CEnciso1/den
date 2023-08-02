import {
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { db } from "../FirebaseConfig";
import LogOut from "../components/LogOut";
import Profile from "../modals/Profile";

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState();
  const [showProfile, setShowProfile] = useState(false);

  const getUserData = async () => {
    const docRef = doc(db, "users", FIREBASE_AUTH.currentUser.uid);
    try {
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
      console.log(docSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const clearDisplay = () => {
    Keyboard.dismiss;
    if (showProfile) setShowProfile(false);
  };

  return (
    <TouchableWithoutFeedback
      className="z-20"
      onPress={clearDisplay}
      accessible={false}
    >
      <View className="h-screen bg-sky-500 flex">
        {showProfile && (
          <View className="justify-center items-center z-10 h-5/6 w-full absolute bg-slate-300">
            <Profile></Profile>
          </View>
        )}
        <View className="justify-center mt-32 h-2/3 bg-white rounded-3xl mx-5 flex"></View>
        <View className="flex-row items-center justify-evenly h-32">
          <View className="">
            <TouchableOpacity
              className="items-center justify-center h-16 w-16 bg-white rounded-full text-center"
              onPress={() => setShowProfile(true)}
            >
              <Image
                source={require("../assets/icons/person-icon.png")}
                className="w-1/3 h-1/3"
              ></Image>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity className=" items-center justify-center h-16 w-16 bg-white rounded-full text-center">
              <Image
                source={require("../assets/icons/workspace-icon.png")}
                className="w-1/3 h-1/3"
              ></Image>
            </TouchableOpacity>
          </View>
          <View className="">
            <TouchableOpacity className=" items-center justify-center h-16 w-16 bg-white rounded-full text-center">
              <Image
                source={require("../assets/icons/chat-icon.png")}
                className="w-1/3 h-1/3"
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfilePage;
