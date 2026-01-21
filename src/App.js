import "../global.css"
import React, { useContext } from 'react';
import { ActivityIndicator, View } from "react-native";
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from "./presentation/screens/start/Start";
import Login from "./presentation/screens/start/Login";
import Register from "./presentation/screens/start/Register";
import PersernalInfo from "./presentation/screens/start/PersernalInfo";
import Homepage from "./presentation/screens/Homepage/HomePage";
import BadgePage from "./presentation/screens/Activitypage/BadgePage";
import LoadingScreen from "./presentation/components/LoadingScreen";

import AppTabs from "./presentation/navigation/AppTabs";

import { AuthContext, AuthProvider } from './context/AuthContext';

const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="AppTabs" component={AppTabs} />

      <MainStack.Screen
        name="BadgePage"
        component={BadgePage}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </MainStack.Navigator>
  );
};

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {userToken !== null ? (
        <AuthenticatedStack />
      ) : (
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

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}