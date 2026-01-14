import "../global.css"
import { ActivityIndicator, View } from "react-native";
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from "./presentation/screens/start/start";
import Login from "./presentation/screens/start/login";
import Register from "./presentation/screens/start/register";
import PersernalInfo from "./presentation/screens/start/persernalinfo";

const Stack = createNativeStackNavigator();

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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="PersernalInfo" component={PersernalInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}