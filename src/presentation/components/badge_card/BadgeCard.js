import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ExpandIcon } from '../../../../assets/icons/Icon';

const BadgeCard = ({ data }) => {
    const isUnlocked = data.unlocked;

    return (
        <View className={`bg-[#1E1E1E] rounded-[25px] p-[18px] h-[170px] justify-between shadow-[2px_2px_10px_#000000] ${isUnlocked ? 'opacity-100' : 'opacity-60'}`}>

            <View className="flex-row justify-between items-start">
                <Text
                    numberOfLines={2}
                    className={`font-line-bold text-[16px] flex-1 mr-2 leading-[20px] ${isUnlocked ? 'text-[#B1FC30]' : 'text-gray-400'}`}
                >
                    {data.name}
                </Text>
                <ExpandIcon />
            </View>

            <View className="items-center justify-center flex-1 -mt-2">
                <Text className={`text-[65px] ${!isUnlocked && 'grayscale'}`}>
                    {data.icon}
                </Text>
            </View>

            <View>
                <Text
                    numberOfLines={1}
                    className="text-white text-[14px] font-line-bold text-center"
                >
                    {data.date || "Locked Badge"}
                </Text>
            </View>

        </View>
    );
};

export default BadgeCard;


