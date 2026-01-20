import React from 'react';
import { View, Text } from 'react-native';
import { ExpandIcon } from '../../../../assets/icons/Icon';
import GoalRing from '../GoalRing';

const WeeklyGoals = ({ data }) => {
    return (
        <View className="flex-1 basis-0 bg-[#1E1E1E] rounded-[20px] p-[12px] justify-between shadow-md shadow-black h-[140px]">

            <View className="flex-row justify-between items-start">
                <Text className="text-primary text-[14px] font-line-bold">Weekly Goals</Text>
                <ExpandIcon />
            </View>

            <View className="flex-row gap-x-[10px] items-center mt-1">
                <GoalRing current={data?.current || 0} target={data?.target || 100} size={50} strokeWidth={10} />
                <View>
                    <Text className="text-white text-[18px] font-line-bold" numberOfLines={1}>
                        {data?.current}
                    </Text>
                    <Text className="text-[#727272] text-[10px] font-line-bold" numberOfLines={1}>
                        / {data?.target} {data?.unit}
                    </Text>
                </View>
            </View>

            <View className="flex-row items-center justify-center gap-x-1">
                <Text className="text-white text-[12px] font-line-bold">{data?.status}</Text>
            </View>
        </View>
    );
};

export default WeeklyGoals;