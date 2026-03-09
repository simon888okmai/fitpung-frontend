import { Text, TextInput, View, Pressable, KeyboardAvoidingView, ScrollView, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import NextButton from "../../components/NextButton";
import AnimatedInput from "../../components/AnimatedInput";
import { registerUser } from "../../../services/auth";

const Register = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const isUsernameValid = username.length >= 6;
    const isPasswordValid = password.length >= 8;
    const isEmailValid = /\S+@\S+\.\S+/.test(email);

    const handleNext = async () => {
        if (!isUsernameValid || !isPasswordValid || !isEmailValid) {
            Alert.alert('Please fill in all fields');
            return;
        }

        const result = await registerUser({ username, password, email });

        if (result.ok) {
            Alert.alert("Success", "Registered successfully! Please Login.");
            navigation.navigate('Login');
        } else {
            Alert.alert("Register Failed", result.data.message);
        }
    };

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
                    <View className="px-[31px] mb-12 ">
                        <Text className="text-[48px] font-line-xbold text-primary">Create your account</Text>
                        <View className="mt-[32px] gap-y-[2px]">
                            <View>
                                <Text className="text-[18px] text-primary font-line-bold mb-[10px]">Username</Text>
                                <AnimatedInput
                                    value={username}
                                    onChangeText={setUsername}
                                    placeholder="Must be at least 6 characters long"
                                    isValid={isUsernameValid}
                                    iconDefault="person-outline"
                                />
                            </View>
                            <View>
                                <Text className="text-[18px] text-primary font-line-bold mb-[10px]">Password</Text>
                                <AnimatedInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Must be at least 8 characters long"
                                    isValid={isPasswordValid}
                                    isSecure
                                    iconDefault="lock-closed-outline"
                                />
                            </View>
                            <View>
                                <Text className="text-[18px] text-primary font-line-bold mb-[10px]">Email</Text>
                                <AnimatedInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Email"
                                    isValid={isEmailValid}
                                    iconDefault="mail-outline"
                                />
                            </View>
                        </View>
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text className="text-[16px] text-white text-center font-line-bold mt-[25px]">Already have an account?</Text>
                        </Pressable>
                    </View>
                </ScrollView>
                <NextButton
                    onPress={handleNext}
                    className="absolute bottom-12 right-8" />
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}
export default Register