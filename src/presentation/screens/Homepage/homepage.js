import React, { useContext } from 'react';
import { View, Text, Pressable, SafeAreaView, ScrollView } from 'react-native';

// 1. เรียกใช้ Context
import { AuthContext } from '../../../context/AuthContext';

const Homepage = () => {
    // 2. ดึงข้อมูล userInfo (ข้อมูลคน login) และฟังก์ชัน logout ออกมา
    const { logout, userInfo } = useContext(AuthContext);

    return (
        <SafeAreaView className="flex-1 bg-color">
            <ScrollView>
                <View className="flex-1 px-[22px] mt-[18]">
                    <Text className="text-[48px] font-line-xbold text-white">👋 Hello, {'\n'}<Text className="text-primary">Simon</Text></Text>
                    <Pressable
                        onPress={logout}
                        className="mt-8 bg-[#FF4444] py-3 px-6 rounded-2xl self-start shadow-md"
                    >
                        <Text className="text-white font-line-bold text-lg">Logout</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Homepage;