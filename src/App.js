import "../global.css"
import React, { useContext } from 'react';
import { ActivityIndicator, View } from "react-native";
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import Start from "./presentation/screens/start/Start";
import Login from "./presentation/screens/start/Login";
import Register from "./presentation/screens/start/Register";
import PersernalInfo from "./presentation/screens/start/PersernalInfo";
import Homepage from "./presentation/screens/Homepage/HomePage";
import LoadingScreen from "./presentation/components/LoadingScreen";

// 👇 แก้ตัวสะกดให้ถูกต้อง (เช็คชื่อไฟล์จริงด้วยนะครับว่า Tabs หรือ Taps)
import AppTabs from "./presentation/navigation/AppTabs";

// Context
import { AuthContext, AuthProvider } from './context/AuthContext';

const Stack = createNativeStackNavigator();

// Navigation
const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  // Loading
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {/* 🔥 แก้ตรงนี้: เช็ค Token ตั้งแต่ชั้นนอกสุด */}
      {userToken !== null ? (
        // ✅ Zone 1: Login แล้ว -> โชว์ Tab Bar เพียวๆ เลย (ไม่ต้องมี Stack ครอบ)
        <AppTabs />
      ) : (
        // ❌ Zone 2: ยังไม่ Login -> โชว์ Stack ของหน้า Login/Register
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="PersernalInfo" component={PersernalInfo} />
        </Stack.Navigator>
      )}
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