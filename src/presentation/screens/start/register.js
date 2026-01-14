import { Text, TextInput, View, Pressable, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import NextButton from "../../components/nextButton";

const Register = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleNext = () => {
        if (!username || !password || !email) {
            alert('Please fill in all fields');
            return;
        } navigation.navigate('PersernalInfo', {
            username,
            password,
            email
        });
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
                        <View className="mt-[32px] gap-y-[20px]">
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
                                className="bg-white h-[53] w-[331px] rounded-[16px] text-black p-[16px] font-line-bold"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#A2A2A2"
                                className="bg-white h-[53] w-[331px] rounded-[16px] text-black p-[16px] font-line-bold"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
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
        </SafeAreaView>
    )
}
export default Register