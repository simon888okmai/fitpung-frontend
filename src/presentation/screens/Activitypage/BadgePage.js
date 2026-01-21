import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import BadgeCard from '../../components/badge_card/BadgeCard';
import BadgeDetailModal from '../../components/badge_card/BadgeDetailModal';
import { BADGES_DATA } from '../../../data/badgesData';

const BadgePage = () => {
    const navigation = useNavigation();

    const [selectedBadge, setSelectedBadge] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const handleBadgePress = (badge) => {
        setSelectedBadge(badge);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedBadge(null);
    };

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
            >
                <View className="flex-row flex-wrap justify-between gap-y-[18px]">
                    {BADGES_DATA.map((badge) => (
                        <TouchableOpacity
                            key={badge.id}
                            className="w-[48%]"
                            activeOpacity={0.8}
                            onPress={() => handleBadgePress(badge)}
                        >
                            <BadgeCard data={badge} />
                        </TouchableOpacity>
                    ))}
                </View>
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