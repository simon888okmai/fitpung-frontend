import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RunCard = ({ data, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            className="bg-[#1E1E1E] rounded-[10px] px-[24px] py-[14px] justify-between shadow-md shadow-black"
        >
            <View className="flex-col gap-y-[10px]">
                <View className="flex-row justify-between items-baseline">
                    <Text className="text-[14px] font-line-bold text-white">{data.date}</Text>
                    <Text className="text-[18px] font-line-bold text-white">{data.time}</Text>
                </View>
                <View className="flex-row items-center gap-x-[24px]">
                    <View className="flex-col">
                        <Text className="text-[18px] font-line-bold text-white">{data.distance} km</Text>
                        <Text className="text-[14px] font-line-bold text-primary">Distance</Text>
                    </View>
                    <View className="flex-col">
                        <Text className="text-[18px] font-line-bold text-white">{data.duration}</Text>
                        <Text className="text-[14px] font-line-bold text-primary">Duration</Text>
                    </View>
                    <View className="flex-col">
                        <Text className="text-[18px] font-line-bold text-white">{data.pace}</Text>
                        <Text className="text-[14px] font-line-bold text-primary">Pace</Text>
                    </View>
                    <View className="flex-col">
                        <Text className="text-[18px] font-line-bold text-white">{data.kcal}</Text>
                        <Text className="text-[14px] font-line-bold text-primary">Kcal</Text>
                    </View>
                </View>
            </View>
            {/* ... (ไส้ใน 4 ช่องสถิติที่เราทำกันเมื่อกี้) ... */}
        </TouchableOpacity>
    );
};
export default RunCard;