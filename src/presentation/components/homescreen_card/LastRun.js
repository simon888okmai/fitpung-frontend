import React from 'react';
import { View, Text } from 'react-native';
import AddButton from '../AddButton';

const LastRun = ({ data }) => {
    // กรณีไม่มีข้อมูล (เผื่อไว้)
    if (!data) return (
        <View className="flex-1 flex-col px-[22px] py-[14px] bg-[#1E1E1E] rounded-[20px] shadow-md shadow-black">
            <View className="flex-col">
                <View className="flex-row items-center gap-x-2">
                    <Text className="text-[24px]">🏃</Text>
                    <Text className="text-primary font-line-bold text-[20px]">Last Run, </Text>
                    <Text className="text-white font-line-bold text-[20px]">No Run Yet</Text>
                </View>
                <View className="flex-1 items-center justify-center py-4">
                    <AddButton />
                </View>
            </View>
        </View>
    );

    return (
        <View className="flex-1 flex-col gap-y-[20px] px-[22px] py-[14px] bg-[#1E1E1E] rounded-[20px] shadow-md shadow-black">
            {/* Header: วันที่ */}
            <View className="flex-row items-baseline">
                <Text className="text-[24px]">🏃</Text>
                <Text className="text-primary font-line-bold text-[20px] ml-2">Last Run, </Text>
                {/* ใช้ dateDisplay ที่ Hook แปลงมาให้แล้ว */}
                <Text className="text-white font-line-bold text-[20px]">{data.dateDisplay}</Text>
            </View>

            {/* Stats Grid */}
            <View className="flex-row flex-wrap justify-between gap-y-[20px]">

                {/* 1. Distance (เพิ่ม .toFixed(2) และหน่วย km) */}
                <View className="w-[48%] flex-col gap-y-[5px] items-center">
                    <Text className="text-primary font-line-bold text-[16px]">Distance</Text>
                    <Text className="text-white font-line-bold text-[20px]">
                        {Number(data.distance).toFixed(2)} km
                    </Text>
                </View>

                {/* 2. Duration (ใช้ค่า Display) */}
                <View className="w-[48%] flex-col gap-y-[5px] items-center">
                    <Text className="text-primary font-line-bold text-[16px]">Duration</Text>
                    <Text className="text-white font-line-bold text-[20px]">
                        {data.durationDisplay}
                    </Text>
                </View>

                {/* 3. Pace (ใช้ค่า Display) */}
                <View className="w-[48%] flex-col gap-y-[5px] items-center">
                    <Text className="text-primary font-line-bold text-[16px]">Pace</Text>
                    <Text className="text-white font-line-bold text-[20px]">
                        {data.paceDisplay}
                    </Text>
                </View>

                {/* 4. Calories (เพิ่มหน่วย kcal) */}
                <View className="w-[48%] flex-col gap-y-[5px] items-center">
                    <Text className="text-primary font-line-bold text-[16px]">Calories</Text>
                    <Text className="text-white font-line-bold text-[20px]">
                        {data.calories} kcal
                    </Text>
                </View>

            </View>
        </View>
    );
};
export default LastRun;