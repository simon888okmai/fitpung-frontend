import "../global.css"
import React, { useContext } from 'react';
import { ActivityIndicator, View } from "react-native";
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import Start from "./presentation/screens/start/start";
import Login from "./presentation/screens/start/login";
import Register from "./presentation/screens/start/register";
import PersernalInfo from "./presentation/screens/start/persernalinfo";
import Homepage from "./presentation/screens/Homepage/homepage";

// Context
import { AuthContext, AuthProvider } from './context/AuthContext';

const Stack = createNativeStackNavigator();

// Navigation
const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  // Loading
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#B1FC30" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken !== null ? (
          // Zone 1: คนที่ Login แล้ว (มี Token) -> ไปหน้า Homepage เลย
          <Stack.Screen name="Homepage" component={Homepage} />
        ) : (
          // Zone 2: คนที่ยังไม่ Login (ไม่มี Token) -> เจอชุดหน้านี้
          <>
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="PersernalInfo" component={PersernalInfo} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  // Font
  const [fontsLoaded] = useFonts({
    'LINESeedSans-Regular': require('../assets/font/Lineseed/LINESeedSans_Rg.otf'),
    'LINESeedSans-Bold': require('../assets/font/Lineseed/LINESeedSans_Bd.otf'),
    'LINESeedSans_XBd': require('../assets/font/Lineseed/LINESeedSans_XBd.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#B1FC30" />
      </View>
    );
  }

  // AuthProvider
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}