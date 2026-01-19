import React from 'react';
import { View, Text } from 'react-native';

const LastRun = ({ data }) => {
    if (!data) return <View>...</View>
    return (
        <View className="flex-1 flex-col gap-y-[20px] px-[22px] py-[14px] bg-[#1E1E1E] rounded-[20px] shadow-md shadow-black">
            <View className="flex-row">
                <Text className="text-[24px]">🏃</Text>
                <Text className="text-primary font-line-bold text-[20px]">Last Run, </Text>
                <Text className="text-white font-line-bold text-[20px]">{data.date}</Text>
            </View>
            <View className="flex-row flex-wrap justify-between gap-y-[20px]">
                <View className="w-[48%] flex-col gap-y-[5px] items-center">
                    <Text className="text-primary font-line-bold text-[16px]">Distance</Text>
                    <Text className="text-white font-line-bold text-[20px]">{data.distance}</Text>
                </View>
                <View className="w-[48%] flex-col gap-y-[5px] items-center">
                    <Text className="text-primary font-line-bold text-[16px]">Duration</Text>
                    <Text className="text-white font-line-bold text-[20px]">{data.duration}</Text>
                </View>
                <View className="w-[48%] flex-col gap-y-[5px] items-center">
                    <Text className="text-primary font-line-bold text-[16px]">Pace</Text>
                    <Text className="text-white font-line-bold text-[20px]">{data.pace}</Text>
                </View>
                <View className="w-[48%] flex-col gap-y-[5px] items-center">
                    <Text className="text-primary font-line-bold text-[16px]">Calories</Text>
                    <Text className="text-white font-line-bold text-[20px]">{data.calories}</Text>
                </View>
            </View>
        </View>
    );
};
export default LastRun;