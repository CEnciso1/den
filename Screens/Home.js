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
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { db } from "../FirebaseConfig";
import LogOut from "../components/LogOut";
import Profile from "../modals/Profile";

const Home = ({ navigation }) => {
  const [user, setUser] = useState();
  const [showProfile, setShowProfile] = useState(false);
  const [photos, setPhotos] = useState([]);

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

  const getUserPhotos = async () => {
    const storage = getStorage();
    for (i = 0; i < user.numPhotos; i++) {
      try {
        url = await getDownloadURL(
          ref(storage, `${FIREBASE_AUTH.currentUser.uid}/images/${i}`)
        );
        setPhotos((photos) => [...photos, url]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (user) {
      getUserPhotos();
    }
  }, [user]);

  const clearDisplay = () => {
    Keyboard.dismiss;
    if (showProfile) setShowProfile(false);
  };

  return (
    <View className="flex justify-center items-center">
      {showProfile && (
        <View className="z-10 flex-col bottom-48 h-full w-full absolute">
          <Profile photos={photos} setPhotos={setPhotos}></Profile>
        </View>
      )}
      <TouchableWithoutFeedback onPress={clearDisplay} accessible={false}>
        <View className="h-screen w-full bg-sky-500 flex">
          <View className="absolute top-20 w-full">
            <LogOut navigation={navigation} />
          </View>
          <View className="justify-center mt-32 h-2/3 bg-white rounded-3xl mx-5 flex">
            <Image className="w-20 h-20" source={{ uri: photos[0] }} />
            <Image className="w-20 h-20" source={{ uri: photos[1] }} />
          </View>
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
    </View>
  );
};

export default Home;
