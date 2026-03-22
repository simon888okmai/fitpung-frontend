import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useActivityDetail } from '../../hooks/useActivityDetail';
import HistoricalMap from '../../components/history_detail/HistoricalMap';
import HistoryStatsBoard from '../../components/history_detail/HistoryStatsBoard';

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
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default RunHistoryDetailScreen;
