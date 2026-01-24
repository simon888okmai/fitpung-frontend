import React, { useContext, useState, useCallback } from 'react';
import { View, Text, Pressable, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useHomeData } from '../../hooks/useHomePage';

import WeeklyGoal from '../../components/homescreen_card/WeeklyGoal';
import LastRun from '../../components/homescreen_card/LastRun';
import ActiveShoe from '../../components/homescreen_card/ActiveShoe';

import { AuthContext } from '../../../context/AuthContext';

const Homepage = () => {
    // 1. เรียก Hook (เหมือนสั่งข้าว ได้ของเลย)
    const { data, loading, error, refetch } = useHomeData();
    const { logout } = useContext(AuthContext);

    // 2. สร้างระบบ Pull to Refresh (รูดเพื่อรีเฟรช)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    // 3. Loading State (ตอนโหลดครั้งแรก)
    if (loading && !refreshing) {
        return (
            <View className="flex-1 bg-color justify-center items-center">
                <ActivityIndicator size="large" color="#bef264" />
            </View>
        );
    }

    // 4. Error State (เน็ตหลุด หรือ Backend พัง)
    if (error) {
        return (
            <View className="flex-1 bg-color justify-center items-center">
                <Text className="text-white mb-4">Error: {error}</Text>
                <Pressable onPress={refetch} className="bg-primary px-4 py-2 rounded-full">
                    <Text className="font-bold text-black">Try Again</Text>
                </Pressable>
            </View>
        );
    }

    // ถ้าไม่มีข้อมูล
    if (!data) return null;

    return (
        <ScrollView
            className="flex-1 bg-color"
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#bef264" />
            }
        >
            <View className="flex-1 px-[22px] mt-[18px] gap-y-[16px] pb-[50px]">

                {/* Header */}
                <Text className="text-[48px] font-line-xbold text-white">
                    👋 Hello, {'\n'}
                    <Text className="text-primary">{data.user?.name || "Runner"}</Text>
                </Text>

                {/* Cards Section */}
                {/* ส่ง data ที่ได้จาก API เข้าไปใน Component เดิม */}

                {data.weeklyGoal && (
                    <WeeklyGoal data={data.weeklyGoal} />
                )}

                {/* เช็คก่อนว่ามีข้อมูลวิ่งล่าสุดไหม */}
                {data.lastRun ? (
                    <LastRun data={data.lastRun} />
                ) : (
                    // กรณี User ใหม่ ยังไม่มีประวัติวิ่ง
                    <View className="bg-[#1C1C1E] p-6 rounded-2xl items-center">
                        <Text className="text-gray-400 font-line">No run history yet.</Text>
                    </View>
                )}

                {/* เช็คก่อนว่ามีรองเท้า Default ไหม */}
                {data.activeShoe && (
                    <ActiveShoe data={data.activeShoe} />
                )}

                {/* Logout Button */}
                <Pressable
                    onPress={logout}
                    className="mt-8 bg-[#FF4444] py-3 px-6 rounded-2xl self-start shadow-md mb-10"
                >
                    <Text className="text-white font-line-bold text-lg">Logout</Text>
                </Pressable>

            </View>
        </ScrollView>
    );
}

export default Homepage;