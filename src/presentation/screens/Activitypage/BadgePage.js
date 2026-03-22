import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import BadgeCard from '../../components/badge_card/BadgeCard';
import BadgeDetailModal from '../../components/badge_card/BadgeDetailModal';
import { useBadges } from '../../hooks/useBadges';

const BadgePage = () => {
    const navigation = useNavigation();


    const { data: badges, isLoading, error, refetch } = useBadges();

    const [selectedBadge, setSelectedBadge] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const handleBadgePress = (badge) => {
        setSelectedBadge(badge);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedBadge(null);
    };

    if (isLoading && !refreshing) {
        return (
            <View className="flex-1 bg-color justify-center items-center">
                <ActivityIndicator size="large" color="#bef264" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 bg-color justify-center items-center">
                <Text className="text-white text-lg mb-4">Failed to load badges</Text>
                <TouchableOpacity
                    onPress={refetch}
                    className="bg-primary px-6 py-2 rounded-full"
                >
                    <Text className="font-line-bold text-black">Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-color">
            <StatusBar barStyle="light-content" />

            <SafeAreaView className="bg-color z-10">
                <View className="flex-row justify-between items-center px-[22px] py-[15px]">

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="w-[40px] h-[40px] justify-center items-start"
                    >
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>

                    <Text className="text-white text-[20px] font-line-bold">
                        Badges
                    </Text>

                    <TouchableOpacity className="w-[40px] h-[40px] justify-center items-end">
                        <Ionicons name="settings-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView
                className="flex-1 px-[22px]"
                contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }}
                showsVerticalScrollIndicator={false}

                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#bef264" />
                }
            >
                {/* ถ้าไม่มีข้อมูลเลย */}
                {!badges || badges.length === 0 ? (
                    <View className="mt-20 items-center">
                        <Text className="text-gray-400 font-line text-lg">No badges found</Text>
                    </View>
                ) : (
                    <View className="flex-row flex-wrap justify-between gap-y-[18px]">
                        {/* ✅ Loop ข้อมูลจริงจาก Backend */}
                        {badges.map((badge) => (
                            <TouchableOpacity
                                key={badge.id}
                                className="w-[48%]"
                                activeOpacity={0.8}
                                onPress={() => handleBadgePress(badge)}
                            >
                                {/* ส่งข้อมูลจริงเข้าไป (มี field isUnlocked ติดไปด้วย) */}
                                <BadgeCard data={badge} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>

            <BadgeDetailModal
                visible={isModalVisible}
                badge={selectedBadge}
                onClose={closeModal}
            />

        </View>
    );
};

export default BadgePage;