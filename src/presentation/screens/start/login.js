import { Text, TextInput, View, Pressable, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { loginUser } from "../../../services/auth";

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        } const result = await loginUser({ username, password });

        if (result.ok) {
            console.log(result.data.user);
        } else {
            alert("Login Failed");
        }
    }
    return (
        <SafeAreaView className="flex-1 bg-color">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="px-[31px]">
                        <Text className="text-[48px] text-primary font-line-xbold">Login here</Text>
                        <Text className="text-[20px] text-white font-line-xbold">Please sign in to continue.</Text>
                        <View className="mt-[32px]">
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor="#A2A2A2"
                                className="bg-white h-[53] w-[331px] rounded-[16px] text-black p-[16px] font-line-bold"
                                autoCapitalize="none"
                                value={username}
                                onChangeText={setUsername}
                            />
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#A2A2A2"
                                className="bg-white h-[53] w-[331px] rounded-[16px] mt-[20px] text-black p-[16px] font-line-bold"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                        <Pressable className="mt-[13px]">
                            <Text className="text-[16px] text-[#A2A2A2] text-right mr-2 font-line-bold">Forgot password?</Text>
                        </Pressable>
                        <Pressable
                            className="bg-primary w-full py-[16px] rounded-[16px] shadow-lg shadow-primary/50 mt-[30px]"
                            onPress={handleLogin}
                        >
                            <Text className="text-[20px] text-black text-center font-line-bold">Sign In</Text>
                        </Pressable>
                        <Pressable
                            className="mt-[25px]"
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text className="text-[16px] text-white text-center font-line-bold">Don't have an account?</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
