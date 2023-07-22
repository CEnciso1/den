import { StatusBar } from 'expo-status-bar';
import {Text, View, SafeAreaView } from 'react-native';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator/> 
    </NavigationContainer>
    
  );
}
