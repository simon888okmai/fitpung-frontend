import { Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Start({ navigation }) {
    return (
        <SafeAreaView className="flex-1 bg-color">
            <View className="flex-1 justify-end px-[22px] mb-10">
                <Text className="text-[48px] font-line-xbold text-white leading-tight">
                    <Text className="text-primary font-line-xbold">Run</Text> to Find Your Peace.
                </Text>
            </View>
            <View className="px-[24px] mb-12 gap-y-4">
                <Pressable
                    className="bg-primary w-full py-4 items-center rounded-full shadow-lg shadow-primary/50"
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text className="text-xl font-line-bold text-black">Start now</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text className="text-xl font-line-bold text-primary text-center">Log in</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}