import {
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  View,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { db } from "../FirebaseConfig";
import LogOut from "../components/LogOut";

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState();

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="h-screen bg-sky-500 ">
        <View className="justify-center h-5/6 top-20 bg-white rounded-3xl mx-5 flex">
          <LogOut navigation={navigation}></LogOut>
          <View className="">{user && <Text>{user.name}</Text>}</View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfilePage;
