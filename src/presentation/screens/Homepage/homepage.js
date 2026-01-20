import React, { useContext } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

import { MOCK_DASHBOARD_FULL, MOCK_DASHBOARD_EMPTY } from '../../../data/dashboardData';
import WeeklyGoal from '../../components/homescreen_card/WeeklyGoal';
import LastRun from '../../components/homescreen_card/LastRun';
import ActiveShoe from '../../components/homescreen_card/ActiveShoe';

// 1. เรียกใช้ Context
import { AuthContext } from '../../../context/AuthContext';

const Homepage = () => {
    const data = MOCK_DASHBOARD_FULL;
    //const data = MOCK_DASHBOARD_EMPTY;
    // 2. ดึงฟังก์ชัน logout ออกมา
    const { logout } = useContext(AuthContext);

    return (
        <ScrollView className="flex-1 bg-color">
            <View className="flex-1 px-[22px] mt-[18] gap-y-[16px]">
                <Text className="text-[48px] font-line-xbold text-white">👋 Hello, {'\n'}<Text className="text-primary">{data.user.name}</Text></Text>
                <WeeklyGoal data={data.weekly_goal} />
                <LastRun data={data.last_run} />
                <ActiveShoe data={data.active_shoe} />
                <Pressable
                    onPress={logout}
                    className="mt-8 bg-[#FF4444] py-3 px-6 rounded-2xl self-start shadow-md"
                >
                    <Text className="text-white font-line-bold text-lg">Logout</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default Homepage;