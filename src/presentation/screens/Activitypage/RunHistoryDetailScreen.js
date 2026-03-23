import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useActivityDetail } from '../../hooks/useActivityDetail';
import HistoricalMap from '../../components/history_detail/HistoricalMap';
import HistoryStatsBoard from '../../components/history_detail/HistoryStatsBoard';
import { calculateSplits } from '../../../utils/trackingUtils';

const SplitsTable = ({ routePath = [] }) => {
    const splits = calculateSplits(routePath);

    if (splits.length === 0) return null;

    return (
        <View className="mt-6 px-[22px]">
            <Text className="font-line-bold text-[18px] text-white mb-3">Milepost Splits</Text>
            <View className="bg-[#1E1E1E] rounded-2xl p-4">
                <View className="flex-row justify-between pb-2 border-b border-gray-800 mb-2">
                    <Text className="text-[#AAAAAA] font-line text-[13px] w-1/3">Kilometer</Text>
                    <Text className="text-[#AAAAAA] font-line text-[13px] text-center w-1/3">Pace</Text>
                    <Text className="text-[#AAAAAA] font-line text-[13px] text-right w-1/3">Split Time</Text>
                </View>
                {splits.map((s, index) => {
                    const totalSec = s.durationSeconds;
                    const min = Math.floor(totalSec / 60);
                    const sec = totalSec % 60;
                    return (
                        <View key={index} className="flex-row justify-between py-3 border-b border-gray-900">
                            <Text className="text-white font-line-bold text-[15px] w-1/3">{s.km} KM</Text>
                            <Text className="text-[#B1FC30] font-line-bold text-[15px] text-center w-1/3">{s.pace} /km</Text>
                            <Text className="text-[#888888] font-line text-[14px] text-right w-1/3">{min}m {sec < 10 ? '0' + sec : sec}s</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};
const RunHistoryDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { runId } = route.params || {};

    const { detailData, loading, error } = useActivityDetail(runId);

    return (
        <SafeAreaView className="flex-1 bg-color">
            <StatusBar barStyle="light-content" />

            {/* Floating Header over map logic or distinct block */}
            <View className="flex-row items-center justify-between pt-[20px] px-[22px] pb-[10px] w-full" style={{ zIndex: 50 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-[44px] h-[44px] bg-[#1E1E1E] rounded-full justify-center items-center shadow-md shadow-black"
                >
                    <Ionicons name="arrow-back" size={24} color="#B1FC30" />
                </TouchableOpacity>
                <Text className="font-line-bold text-[24px] text-white">Route Details</Text>
                <View className="w-[44px]" />
            </View>

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#B1FC30" />
                    <Text className="text-[#AAAAAA] mt-4 font-line text-[14px]">Reconstructing run...</Text>
                </View>
            ) : error ? (
                <View className="flex-1 justify-center items-center px-[22px]">
                    <Ionicons name="alert-circle-outline" size={60} color="#FF4444" />
                    <Text className="text-[#FF4444] mt-4 font-line-bold text-[16px] text-center">Failed to load route</Text>
                    <Text className="text-[#AAAAAA] mt-1 font-line text-[12px] text-center">{error}</Text>
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} className="flex-1" bounces={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    <HistoricalMap routePath={detailData?.routePath} />
                    <HistoryStatsBoard data={detailData} />
                    <SplitsTable routePath={detailData?.routePath} />
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default RunHistoryDetailScreen;
