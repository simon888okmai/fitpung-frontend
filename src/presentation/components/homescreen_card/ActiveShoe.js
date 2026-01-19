import React from 'react';
import { View, Text } from 'react-native';

const ActiveShoe = ({ data }) => {
    if (!data) return <View>...</View>

    const percentage = Math.min((data.current_distance / data.max_distance) * 100, 100);

    return (
        <View className="flex-1 flex-col gap-y-[20px] px-[22px] py-[14px] bg-[#1E1E1E] rounded-[20px] shadow-md shadow-black">
            <View className="flex-row gap-y-[15px]">
                <Text className="text-[24px]">👟 </Text>
                <Text className="text-primary font-line-bold text-[20px]">My Shoe</Text>
            </View>
            <Text className="text-white font-line-bold text-[18px]">{data.name}</Text>
            <View className="flex-row items-baseline">
                <Text className="text-primary font-line-bold text-[16px]">Current Distance:  </Text>
                <Text className="text-white font-line-bold text-[18px]">{data.current_distance} / {data.max_distance} KM</Text>
            </View>
            <View className="w-full h-[20px] bg-[#444444] rounded-[5px] overflow-hidden">
                <View
                    className="h-full bg-primary rounded-[5px]"
                    style={{ width: `${percentage}%` }}
                />
            </View>
        </View>
    );
};
export default ActiveShoe;