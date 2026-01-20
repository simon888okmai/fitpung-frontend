import React from 'react';
import { View, Text } from 'react-native';

const ThisMonth = ({ month, stats }) => {

    const currentStreak = stats?.streak || 0;

    return (
        <View className="gap-y-[20px]">

            <View className="flex-row items-center gap-x-2">
                <Text className="text-[20px]">🗓️</Text>
                <Text className="text-[32px] font-line-bold text-primary">
                    {month}
                </Text>
            </View>

            {currentStreak > 0 ? (
                // ✅ กรณีมี Streak (แบบเดิม): พื้นหลังเขียว
                <View className="bg-primary rounded-[10px] px-[8px] py-[4px] self-start flex-row items-baseline gap-x-[2px]">
                    <Text className="text-[24px]">🔥</Text>
                    <Text className="text-[18px] font-line-bold text-black">
                        {currentStreak} Streak !!!
                    </Text>
                </View>
            ) : (
                // ❌ กรณี Streak เป็น 0: พื้นหลังเทา + ข้อความเชียร์
                <View className="bg-[#5e6063] rounded-[10px] px-[15px] py-[6px] self-start flex-row items-baseline gap-x-[2px]">
                    <Text className="text-[24px]">👟</Text>
                    <Text className="text-[16px] font-line-bold text-white">
                        Let's start running!
                    </Text>
                </View>
            )}

            <View className="flex-row items-start">
                <View className="w-[180px]">
                    <Text className="text-[24px] font-line-bold text-white">
                        {stats?.totalDistance} km
                    </Text>
                    <Text className="text-[15px] font-line-bold text-primary">
                        Distance
                    </Text>
                </View>

                <View>
                    <Text className="text-[24px] font-line-bold text-white">
                        {stats?.totalTime}
                    </Text>
                    <Text className="text-[15px] font-line-bold text-primary">
                        Time
                    </Text>
                </View>
            </View>

            <View>
                <Text className="text-[24px] font-line-bold text-white">
                    {stats?.totalCalories} kcal
                </Text>
                <Text className="text-[15px] font-line-bold text-primary">
                    Calories
                </Text>
            </View>

        </View>
    );
}

export default ThisMonth;