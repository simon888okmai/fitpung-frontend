import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useActivityStats } from '../../hooks/useActivityStats';

import ThisMonth from '../../components/activity_card/ThisMonth';
import CalendarView from '../../components/activity_card/Calendar';
import WeeklyGoals from '../../components/activity_card/WeeklyGoals';
import Badges from '../../components/activity_card/Badges';
import RecentRuns from '../../components/activity_card/RecentRuns';

const ActivityPage = () => {
    const navigation = useNavigation();

    // 1. เรียกใช้ Hook แทนการใช้ข้อมูล Mock
    // (Hook นี้จะจัดการดึงข้อมูล + แปลง Format ให้เสร็จสรรพ)
    const { data, loading, error } = useActivityStats();

    // 2. คำนวณวันเวลาปัจจุบัน (เอาไว้โชว์หัวข้อเดือน)
    const now = new Date();
    const thisYear = now.getFullYear();
    const thisMonthIndex = now.getMonth();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const displayMonth = `${monthNames[thisMonthIndex]} ${thisYear}`;

    // 3. แสดง Loading ระหว่างรอข้อมูล
    if (loading) {
        return (
            <View className="flex-1 bg-color justify-center items-center">
                <ActivityIndicator size="large" color="#bef264" />
            </View>
        );
    }

    // 4. แสดง Error หรือ State ไม่มีข้อมูล
    if (error) {
        return (
            <View className="flex-1 bg-color justify-center items-center">
                <Text className="text-white">Error: {error}</Text>
            </View>
        );
    }

    if (!data) return null;

    return (
        <ScrollView className="flex-1 bg-color">
            <View className="flex-1 px-[22px] mt-[18px]">

                {/* Header: This Month */}
                <View className='mb-[20px]'>
                    <ThisMonth
                        month={displayMonth}
                        // ส่งข้อมูล summary ที่ Hook จัดการมาให้แล้ว
                        // (Hook ควรแปลง totalTime เป็น string ให้แล้วใน field 'totalTimeDisplay')
                        stats={{
                            ...data.summary,
                            totalTime: data.summary.totalTimeDisplay // ใช้ค่าที่ format แล้ว
                        }}
                    />
                </View>

                {/* Calendar View */}
                <CalendarView
                    year={thisYear}
                    month={thisMonthIndex}
                    runDays={data.summary.runDays} // Array วันที่ [1, 5, 8...]
                />

                <View className="bg-primary h-[2px] w-full"></View>

                {/* Cards: Goal & Badges */}
                <View className='flex-row gap-x-[15px] mt-[30px] mb-[30px]'>
                    <View className="flex-1">
                        <TouchableOpacity
                            onPress={() => navigation.navigate('WeeklyGoalPage')}>
                            <WeeklyGoals
                                data={data.cards.weeklyGoal}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        className="flex-1"
                        onPress={() => navigation.navigate('BadgePage')}
                    >
                        <Badges
                            data={data.cards.badges}
                        />
                    </TouchableOpacity>
                </View>

                {/* Recent Runs */}
                {/* Hook ควร map ข้อมูลให้มี field ที่ RecentRuns ต้องการแล้ว (เช่น dateDisplay, timeDisplay) */}
                <RecentRuns
                    runs={data.recentRuns}
                />
            </View>
        </ScrollView>
    );
}

export default ActivityPage;