import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, TextInput, View, Platform, Modal, KeyboardAvoidingView, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import NextButton from "../../components/nextButton";

const PersernalInfo = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [gender, setGender] = useState("");
    const [selectedGender, setSelectedGender] = useState("Male");
    const [showGenderPicker, setShowGenderPicker] = useState(false);

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = ({ type }, selectedDate) => {
        const currentDate = selectedDate || date;
        if (Platform.OS === "android") {
            toggleDatePicker();
            if (type === "test" || type === "set") {
                setDate(currentDate);
                setDateOfBirth(currentDate.toLocaleDateString());
            }
        } else {
            setDate(currentDate);
        }
    };

    const confirmIOSDate = () => {
        setDateOfBirth(date.toLocaleDateString());
        toggleDatePicker();
    };

    const toggleGenderPicker = () => {
        setShowGenderPicker(!showGenderPicker);
    };

    const confirmGender = () => {
        setGender(selectedGender);
        toggleGenderPicker();
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
                    <View className="px-[31px]">
                        <Text className="text-[48px] text-primary font-line-xbold">Tell us {'\n'}about you</Text >
                        <View className="mt-[32px] gap-y-[20px]">
                            <TextInput placeholder="Name" placeholderTextColor="#A2A2A2" className="bg-white h-[53] w-[331px] rounded-[16px] text-black p-[16px] font-line-bold" />
                            {/* Date of Birth */}
                            <View>
                                <Pressable onPress={toggleDatePicker}>
                                    <TextInput
                                        placeholder="Date of Birth"
                                        placeholderTextColor="#A2A2A2"
                                        className="bg-white h-[53] w-[331px] rounded-[16px] text-black p-[16px] font-line-bold"
                                        value={dateOfBirth}
                                        editable={false}
                                        onPressIn={toggleDatePicker}
                                    />
                                </Pressable>
                                {showPicker && (
                                    <Modal
                                        transparent={true}
                                        animationType="slide"
                                        visible={showPicker}
                                        onRequestClose={toggleDatePicker}
                                    >
                                        <View className="flex-1 justify-end">
                                            <View className="bg-[#1C1C1E] rounded-t-[20px] pb-8">
                                                <View className="flex-row justify-between items-center p-4 border-b border-gray-700">
                                                    <Pressable onPress={toggleDatePicker}>
                                                        <Text className="text-[#A2A2A2] text-[16px] font-line-bold">Cancel</Text>
                                                    </Pressable>
                                                    <Pressable onPress={confirmIOSDate}>
                                                        <Text className="text-primary text-[16px] font-line-bold">Confirm</Text>
                                                    </Pressable>
                                                </View>
                                                <View className="items-center justify-center pt-4">
                                                    <DateTimePicker
                                                        mode="date"
                                                        display="spinner"
                                                        value={date}
                                                        onChange={onChange}
                                                        maximumDate={new Date()}
                                                        minimumDate={new Date(1900, 0, 1)}
                                                        textColor="white"
                                                        themeVariant="dark"
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>
                            {/* Gender */}
                            <View>
                                <Pressable onPress={toggleGenderPicker}>
                                    <TextInput
                                        placeholder="Gender"
                                        placeholderTextColor="#A2A2A2"
                                        className="bg-white h-[53] w-[331px] rounded-[16px] text-black p-[16px] font-line-bold"
                                        value={gender}
                                        editable={false}
                                        onPressIn={toggleGenderPicker}
                                    />
                                </Pressable>
                                {showGenderPicker && (
                                    <Modal
                                        transparent={true}
                                        animationType="slide"
                                        visible={showGenderPicker}
                                        onRequestClose={toggleGenderPicker}
                                    >
                                        <View className="flex-1 justify-end">
                                            <View className="bg-[#1C1C1E] rounded-t-[20px] pb-8">
                                                <View className="flex-row justify-between items-center p-4 border-b border-gray-700">
                                                    <Pressable onPress={toggleGenderPicker}>
                                                        <Text className="text-[#A2A2A2] text-[16px] font-line-bold">Cancel</Text>
                                                    </Pressable>
                                                    <Pressable onPress={confirmGender}>
                                                        <Text className="text-primary text-[16px] font-line-bold">Confirm</Text>
                                                    </Pressable>
                                                </View>
                                                <View className="items-center justify-center pt-4">
                                                    <Picker
                                                        selectedValue={selectedGender}
                                                        onValueChange={(itemValue) => setSelectedGender(itemValue)}
                                                        style={{ width: 320, height: 216, color: "white" }}
                                                        itemStyle={{ color: "white" }} // For iOS Picker item color
                                                    >
                                                        <Picker.Item label="Male" value="Male" />
                                                        <Picker.Item label="Female" value="Female" />
                                                    </Picker>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                )}
                            </View>
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center gap-x-[16px]">
                                    <TextInput placeholder="Height" placeholderTextColor="#A2A2A2" keyboardType="numeric" maxLength={3} selectionColor="black" className="bg-white rounded-[16px] text-black w-[100px] py-[16px] font-line-bold text-center" />
                                    <Text className="font-line-bold text-primary text-[16px]">CM.</Text>
                                </View>
                                <View className="flex-row items-center gap-x-[16px]">
                                    <TextInput placeholder="Weight" placeholderTextColor="#A2A2A2" keyboardType="numeric" maxLength={3} selectionColor="black" className="bg-white rounded-[16px] text-black w-[100px] py-[16px] font-line-bold text-center" />
                                    <Text className="font-line-bold text-primary text-[16px]">KG.</Text>
                                </View>
                            </View>
                            <Pressable
                                className="bg-primary w-full py-4 items-center rounded-full shadow-lg shadow-primary/50"
                                onPress={() => navigation.navigate('Homepage')}
                            >
                                <Text className="text-xl font-line-bold text-black">Submit</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}
export default PersernalInfo
