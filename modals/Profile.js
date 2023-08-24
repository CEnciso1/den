import {
  Button,
  View,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const Profile = ({ photos, setPhotos }) => {
  const [showSelectionOption, setShowSelectionOption] = useState(false);

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (photos.length == 6) {
        const arr = [...photos];
        arr[index] = result.assets[0].uri;
        setPhotos(arr);
      } else setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const handlePhotos = async () => {
    for (i = 0; i < photos.length; i++) {
      console.log("test1");
      const response = await fetch(photos[i]);
      const blob = await response.blob();
      console.log("test2");
      const storage = getStorage();
      const storageRef = ref(storage, `${user.uid}/images/${i}`);
      console.log("test3");
      try {
        const uploadResponse = await uploadBytesResumable(storageRef, blob);
        console.log("test4");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const selectionOption = (num) => {
    setShowSelectionOption(true);
  };

  return (
    <View>
      <View className="h-full w-full bg-white flex-col justify-center">
        {showSelectionOption && (
          <View className="z-10 top-48 absolute justify-center h-full w-full">
            <TouchableWithoutFeedback
              onPress={() => setShowSelectionOption(false)}
            >
              <View className="h-full w-full border flex-col justify-center items-center bg-black opacity-50">
                <Text>Test</Text>
              </View>
            </TouchableWithoutFeedback>
            <View className="z-20 top-3/4 absolute w-full ">
              <View className="w-full bg-slate-200 mb-5 h-12 rounded-lg">
                <Button className="text-center" title="Delete" color="black" />
              </View>
              <View className="w-full bg-slate-200 h-12 rounded-lg">
                <Button
                  className="text-center"
                  title="Replace Photo"
                  color="black"
                />
              </View>
            </View>
          </View>
        )}
        <View className="items-center mt-80">
          <Text className="font-bold text-2xl ">Add Photos</Text>
        </View>
        <View className="flex-row justify-between self-center w-5/6 h-3/5 flex-wrap">
          <TouchableOpacity
            className="h-24 w-24 mb-5 justify-center items-center bg-slate-200 rounded-lg"
            onPress={photos[0] ? () => selectionOption(0) : () => pickImage(0)}
          >
            {photos[0] && (
              <Image
                source={{ uri: photos[0] }}
                className="rounded-lg w-full h-full"
              />
            )}
            {!photos[0] && (
              <Image
                source={require("../assets/icons/plus-icon.png")}
                className="w-1/3 h-1/3"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="h-24 w-24 mb-5 justify-center items-center bg-slate-200 rounded-lg"
            onPress={() => pickImage(1)}
          >
            {photos[1] && (
              <Image
                source={{ uri: photos[1] }}
                className="rounded-lg w-full h-full"
              />
            )}
            {!photos[1] && (
              <Image
                source={require("../assets/icons/plus-icon.png")}
                className="w-1/3 h-1/3"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="h-24 w-24 mb-5 justify-center items-center bg-slate-200 rounded-lg"
            onPress={() => pickImage(2)}
          >
            {photos[2] && (
              <Image
                source={{ uri: photos[2] }}
                className="rounded-lg w-full h-full"
              />
            )}
            {!photos[2] && (
              <Image
                source={require("../assets/icons/plus-icon.png")}
                className="w-1/3 h-1/3"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="h-24 w-24 mb-5 justify-center items-center bg-slate-200 rounded-lg"
            onPress={() => pickImage(3)}
          >
            {photos[3] && (
              <Image
                source={{ uri: photos[3] }}
                className="rounded-lg w-full h-full"
              />
            )}
            {!photos[3] && (
              <Image
                source={require("../assets/icons/plus-icon.png")}
                className="w-1/3 h-1/3"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="h-24 w-24 mb-5 justify-center items-center bg-slate-200 rounded-lg"
            onPress={() => pickImage(4)}
          >
            {photos[4] && (
              <Image
                source={{ uri: photos[4] }}
                className="rounded-lg w-full h-full"
              />
            )}
            {!photos[4] && (
              <Image
                source={require("../assets/icons/plus-icon.png")}
                className="w-1/3 h-1/3"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className="h-24 w-24 mb-5 justify-center items-center bg-slate-200 rounded-lg"
            onPress={() => pickImage(5)}
          >
            {photos[5] && (
              <Image
                source={{ uri: photos[5] }}
                className="rounded-lg w-full h-full"
              />
            )}
            {!photos[5] && (
              <Image
                source={require("../assets/icons/plus-icon.png")}
                className="w-1/3 h-1/3"
              />
            )}
          </TouchableOpacity>
        </View>
        <View className="bg-sky-200 ">
          <Button title="Edit" color="black"></Button>
        </View>
      </View>
    </View>
  );
};

export default Profile;
