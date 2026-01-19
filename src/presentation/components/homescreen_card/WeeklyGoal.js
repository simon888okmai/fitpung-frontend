import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoalRing from '../GoalRing';

const WeeklyGoal = ({ data }) => {
    if (!data) return <View>...</View>
    return (
        <View className="flex-1 flex-col gap-y-[10px] px-[22px] py-[12px] bg-[#1E1E1E] rounded-[20px] shadow-lg shadow-black">
            <Text className="text-primary text-[20px] font-line-bold inline-block"><Text className="text-[24px]">🏆</Text> Weekly Goal</Text>
            <View className="flex-row gap-x-[20px]">
                <GoalRing current={data.current} target={data.target} />
                <View className="flex-col gap-y-[20px]">
                    <Text className="text-[18px] font-line-bold text-white">Distance : {data.current} / {data.target} {data.unit}</Text>
                    <View className="bg-primary rounded-[10px] px-[8px] py-[4px] self-start flex-row items-baseline gap-x-[2px]">
                        <Text className="text-[24px]">🔥</Text>
                        <Text className="text-[18px] font-line-bold text-black">{data.streak} Streak !!!</Text>
                    </View>
                </View>

            </View>
        </View>
    );
};
export default WeeklyGoal;
