import { Text, TextInput, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NextButton from "../../components/nextButton";

const Register = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-1 bg-color justify-center">
            <View className="px-[31px] mb-12 ">
                <Text className="text-[48px] font-line-xbold text-primary">Create your account</Text>
                <View className="mt-[32px] gap-y-[20px]">
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#A2A2A2"
                        className="bg-white h-[53] w-[331px] rounded-[16px] text-black p-[16px] font-line-bold"
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#A2A2A2"
                        className="bg-white h-[53] w-[331px] rounded-[16px] text-black p-[16px] font-line-bold"
                    />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#A2A2A2"
                        className="bg-white h-[53] w-[331px] rounded-[16px] text-black p-[16px] font-line-bold"
                    />
                </View>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text className="text-[16px] text-white text-center font-line-bold mt-[25px]">Already have an account?</Text>
                </Pressable>
            </View>
            <NextButton
                onPress={() => navigation.navigate('PersernalInfo')}
                className="absolute bottom-12 right-8" />
        </SafeAreaView>
    )
}
export default Register