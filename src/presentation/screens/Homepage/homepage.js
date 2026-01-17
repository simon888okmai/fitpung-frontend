import React, { useContext } from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';

// 1. เรียกใช้ Context
import { AuthContext } from '../../../context/AuthContext';

const Homepage = () => {
    // 2. ดึงข้อมูล userInfo (ข้อมูลคน login) และฟังก์ชัน logout ออกมา
    const { logout, userInfo } = useContext(AuthContext);

    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center">

            {/* 3. เอาชื่อมาโชว์ตรงนี้ */}
            <Text className="text-2xl font-bold mb-4">
                สวัสดีคุณ, {userInfo?.username} 👋
            </Text>

            <Text className="text-gray-500 mb-8">
                Email: {userInfo?.email}
            </Text>

            <Pressable
                onPress={() => { logout() }}
                className="bg-red-500 px-6 py-3 rounded-full shadow-md"
            >
                <Text className="text-white font-bold">Logout</Text>
            </Pressable>
        </SafeAreaView>
    );
}

export default Homepage;