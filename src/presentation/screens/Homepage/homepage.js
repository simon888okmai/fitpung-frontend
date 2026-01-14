import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Homepage = () => {

    return (
        <SafeAreaView className="flex-1 bg-color">
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="px-[31px]">
                    <Text className="text-[48px] text-primary font-line-xbold">Homepage</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Homepage