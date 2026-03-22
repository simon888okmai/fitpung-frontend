import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingItem = ({ icon, title, titleColor = "text-white", onPress, isDanger = false }) => (
    <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center justify-between bg-[#1E1E1E] p-[16px] rounded-[16px] mb-[12px] shadow-sm shadow-black/40"
    >
        <View className="flex-row items-center gap-x-[12px]">
            <Ionicons name={icon} size={24} color={isDanger ? "#FF4444" : "#B1FC30"} />
            <Text className={`text-[16px] font-line-bold ${titleColor}`}>{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666666" />
    </TouchableOpacity>
);

export default SettingItem;
