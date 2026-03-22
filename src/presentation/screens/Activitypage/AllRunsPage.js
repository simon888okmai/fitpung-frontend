import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAllRuns } from '../../hooks/useAllRuns';
import RunCard from '../../components/activity_card/RunCard';

const AllRunsPage = () => {
    const navigation = useNavigation();
    const { data, loading, error, refetch } = useAllRuns();

    useFocusEffect(
        useCallback(() => {
            if (refetch) refetch();
        }, [refetch])
    );

    return (
        <SafeAreaView className="flex-1 bg-color">
            <StatusBar barStyle="light-content" />
            <View className="flex-1">
                <View className="flex-row items-center mb-[20px] pt-[20px] px-[22px]">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                        <Ionicons name="arrow-back" size={28} color="#B1FC30" />
                    </TouchableOpacity>
                    <Text className="font-line-bold text-[28px] text-white">All Runs History</Text>
                </View>

                {loading && (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#B1FC30" />
                    </View>
                )}

                {error && (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-white text-[16px]">Error: {error}</Text>
                    </View>
                )}

                {!loading && !error && (
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                        renderItem={({ item }) => (
                            <RunCard
                                data={item}
                                onPress={() => navigation.navigate('RunHistoryDetailScreen', { runId: item.id })}
                            />
                        )}
                        contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 60, gap: 15 }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View className="flex-1 justify-center items-center py-10">
                                <Text className="text-[#AAAAAA] font-line">No run history yet.</Text>
                            </View>
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default AllRunsPage;
