import {
  TextInput,
  View,
  Text,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { db } from "../FirebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

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
  const [birthDay, setBirthDay] = useState("");
  const [showBirthDay, setShowBirthDay] = useState(false);
  const [gender, setGender] = useState();
  const [showGender, setShowGender] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photosData, setPhotosData] = useState();
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

  const passwordInput = () => {
    const handlePassword = async () => {
      if (password.length >= 6) {
        setShowPassword(false);
        setShowBirthDay(true);
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

  const birthDayInput = () => {
    const handleBirthDay = () => {
      const regex = /^(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-(19|20)\d\d$/;
      if (regex.test(birthDay)) {
        setShowBirthDay(false);
        setShowGender(true);
        const dateArray = birthDay.split("-");
        console.log(
          dateArray,
          new Date(dateArray[2], dateArray[0] - 1, dateArray[1]).toString()
        );
        setValidationAlert("Success, birth date is valid");
        setError(false);
      } else {
        setValidationAlert("Error, birth date is invalid");
        setError(true);
      }
    };

    return (
      <View className="relative items-center bottom-5">
        <Text className="font-bold text-2xl">Date of Birth</Text>
        <View>
          <TextInput
            onChangeText={setBirthDay}
            value={birthDay}
            className="border 
            p-10 rounded-md mt-2"
            fontSize={20}
            color="black"
            placeholder="mm-dd-yyy"
          ></TextInput>
        </View>
        <View className="w-3/4 py-5 top-7 rounded-xl bg-sky-200">
          <Button onPress={handleBirthDay} color="black" title="Next" />
        </View>
      </View>
    );
  };

  const genderInput = () => {
    const handleGender = (gender) => {
      setGender(gender);
      setShowGender(false);
      setShowPhotos(true);
    };

    return (
      <View className="relative items-center bottom-5">
        <Text className="font-bold text-2xl">I am a</Text>
        <View className="w-3/4 py-5 rounded-xl bg-sky-200">
          <Button
            onPress={() => handleGender("male")}
            color="black"
            title="Male"
          />
        </View>
        <View className="w-3/4 py-5 top-7 rounded-xl bg-sky-200">
          <Button
            onPress={() => handleGender("female")}
            color="black"
            title="Female"
          />
        </View>
        <View className="w-3/4 py-5 top-14 rounded-xl bg-sky-200">
          <Button
            onPress={() => handleGender("nonbinary")}
            color="black"
            title="Nonbinary"
          />
        </View>
      </View>
    );
  };

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
    setShowPhotos(false);
    setShowName(true);
  };

  const photosInput = () => {
    return (
      <View className="items-center">
        <View className="items-center">
          <Text className="font-bold text-2xl ">Add Photos</Text>
        </View>
        <View className="flex-row justify-between self-center top-10 w-5/6 h-3/5 flex-wrap">
          <TouchableOpacity
            className="h-24 w-24 mb-5 justify-center items-center bg-slate-200 rounded-lg"
            onPress={() => pickImage(0)}
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
        <View className="w-3/4 py-5 top-7 rounded-xl bg-sky-200">
          <Button title="Next" color="black" onPress={handlePhotos} />
        </View>
      </View>
    );
  };

  const nameInput = () => {
    const handleName = async () => {
      const regex = /^[A-Za-z\s]+$/;
      if (regex.test(name)) {
        setError(false);
        setValidationAlert("Success, name is valid!");
        try {
          console.log(user.uid);
          const dateArray = birthDay.split("-");
          await setDoc(doc(db, "users", user.uid), {
            name: name,
            gender: gender,
            dob: Timestamp.fromDate(
              new Date(dateArray[2], dateArray[0] - 1, dateArray[1])
            ),
          });
          console.log("new user");
          navigation.navigate("Home");
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
          {showBirthDay && birthDayInput()}
          {showGender && genderInput()}
          {showPhotos && photosInput()}
          {showName && nameInput()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateAccount;
