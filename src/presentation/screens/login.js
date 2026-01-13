import { Text, TextInput, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    return (
        <SafeAreaView className="flex-1 bg-color justify-center">
            <View className="px-[31px]">
                <Text className="text-[48px] text-primary font-line-xbold">Login here</Text>
                <Text className="text-[20px] text-white font-line-xbold">Please sign in to continue.</Text>
                <View className="mt-[32px]">
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#A2A2A2"
                        className="bg-white h-[53] w-[331px] rounded-[16px] text-black p-[16px] font-line-bold"
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#A2A2A2"
                        className="bg-white h-[53] w-[331px] rounded-[16px] mt-[20px] text-black p-[16px] font-line-bold"
                    />
                </View>
                <Pressable className="mt-[13px]">
                    <Text className="text-[16px] text-[#A2A2A2] text-right mr-2 font-line-bold">Forgot password?</Text>
                </Pressable>
                <Pressable
                    className="bg-primary w-full py-[16px] rounded-[16px] shadow-lg shadow-primary/50 mt-[30px]"
                >
                    <Text className="text-[20px] text-black text-center font-line-bold">Sign In</Text>
                </Pressable>
                <Pressable
                    className="mt-[25px]"
                >
                    <Text className="text-[16px] text-white text-center font-line-bold">Don't have an account?</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
