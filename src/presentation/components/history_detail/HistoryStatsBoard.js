import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDuration, formatPace } from '../../../utils/formatters';

const StatBox = ({ icon, label, value, unit }) => (
    <View className="bg-[#1E1E1E] flex-1 p-[16px] rounded-[16px] shadow-sm shadow-black/40">
        <View className="flex-row items-center mb-[8px]">
            <Ionicons name={icon} size={20} color="#B1FC30" />
            <Text className="text-[#AAAAAA] text-[12px] font-line-bold ml-[6px]">{label}</Text>
        </View>
        <View className="flex-row items-baseline">
            <Text className="text-white text-[24px] font-line-bold">{value}</Text>
            {unit ? <Text className="text-[#AAAAAA] text-[12px] font-line-bold ml-[4px]">{unit}</Text> : null}
        </View>
    </View>
);

const HistoryStatsBoard = ({ data }) => {
    if (!data) return null;

    const distanceStr = typeof data.distance === 'number' ? data.distance.toFixed(2) : data.distance;

    let durationStr = data.duration;
    if (typeof data.duration === 'number') {
        durationStr = formatDuration(data.duration);
    }

    const paceStr = typeof data.pace === 'number' ? formatPace(data.pace) : data.pace;
    const kcalStr = typeof data.calories === 'number' ? Math.round(data.calories).toString() : (data.calories || data.kcal || '--');

    return (
        <View className="px-[22px] py-[20px]">
            {/* Context Card (Date/Time) */}
            <View className="flex-row items-center mb-[20px] bg-[#1E1E1E] p-4 rounded-[16px] shadow-sm shadow-black/40">
                <Ionicons name="calendar-outline" size={24} color="#B1FC30" />
                <View className="ml-4">
                    <Text className="text-white font-line-bold text-[18px]">
                        {data.startTime ? new Date(data.startTime).toLocaleDateString() : (data.date || 'Run History')}
                    </Text>
                    <Text className="text-[#AAAAAA] font-line text-[14px]">
                        {data.startTime ? new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Completed Activity'}
                    </Text>
                </View>
            </View>

            {/* Top Stat Row */}
            <View className="flex-row justify-between mb-[12px] gap-x-[12px]">
                <StatBox icon="walk-outline" label="Distance" value={distanceStr || '--'} unit="km" />
                <StatBox icon="time-outline" label="Duration" value={durationStr || '--'} unit="" />
            </View>

            {/* Bottom Stat Row */}
            <View className="flex-row justify-between gap-x-[12px]">
                <StatBox icon="speedometer-outline" label="Avg Pace" value={paceStr || '--'} unit="" />
                <StatBox icon="flame-outline" label="Calories" value={kcalStr} unit="kcal" />
            </View>
        </View>
    );
};

export default HistoryStatsBoard;
