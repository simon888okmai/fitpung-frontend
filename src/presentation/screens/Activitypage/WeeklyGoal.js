import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useWeeklyGoal } from '../../hooks/useWeeklyGoal';
import GoalRing from '../../components/GoalRing';
import GoalPicker from '../../components/weekly_page/GoalPicker';
import Graph from '../../components/weekly_page/Graph';
import LoadingScreen from '../../components/LoadingScreen';
import { formatDuration, formatPace } from '../../../utils/formatters';

const WeeklyGoalPage = () => {
    const navigation = useNavigation();
    const [target, setTarget] = useState(100);
    const { data, loading, error, createGoal, isCreating } = useWeeklyGoal();

    if (loading) return <LoadingScreen />;

    const hasGoal = data?.hasGoal || false;

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
                        Weekly Goal
                    </Text>

                    <TouchableOpacity className="w-[40px] h-[40px] justify-center items-end">
                        <Ionicons name="settings-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <ScrollView
                className="flex-1 px-[28px]"
                contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }}
                showsVerticalScrollIndicator={false}>
                {hasGoal ? (
                    <View className="flex-col gap-y-[20px]">
                        <View>
                            <Text className="font-line-xbold text-primary text-[48px]">Goal</Text>
                            <Text className="font-line-bold text-white text-[24px]">
                                {data.startDate && data.endDate
                                    ? `${new Date(data.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${new Date(data.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
                                    : 'Active Goal'}
                            </Text>
                        </View>
                        <View className="flex-row justify-between">
                            <GoalRing size={175} strokeWidth={40} current={data?.current || 0} target={data?.target || 0} />
                            <View className="flex-col items-end justify-center">
                                <Text className="font-line-xbold text-primary text-[48px]">{data?.current || 0}</Text>
                                <Text className="font-line-xbold text-white text-[48px]">/ {data?.target || 0}</Text>
                                <Text className="font-line-xbold text-white text-[24px]">km</Text>
                                <Text className="font-line-xbold text-gray-500 text-[20px]">
                                    {data?.isCompleted ? 'Goal Completed!' : `Left ${Math.max(0, (data?.target || 0) - (data?.current || 0))}`}
                                </Text>
                            </View>
                        </View>
                        <View className="bg-primary w-full h-[2px]"></View>
                        <View className="flex-col gap-y-[20px]">
                            <Text className="font-line-xbold text-primary text-[24px]">This Week</Text>
                            <Graph data={data?.graphData} />
                            <Text className="font-line-xbold text-primary text-[24px]">Stats,<Text className="font-line-bold text-white text-[24px]"> Week total</Text></Text>
                            <View className="flex-col gap-y-[12px]">
                                <View className="flex-row gap-x-[12px]">
                                    <View className="bg-[#1C1C1E] rounded-[16px] p-4 flex-1 items-center justify-center min-h-[100px] shadow-lg shadow-black/50">
                                        <Text className="text-[16px] font-line-bold mb-1 text-primary">Distance</Text>
                                        <Text className="text-white text-[32px] font-line-bold">{typeof data?.current === 'number' ? data.current.toFixed(2) : (data?.current || 0)}</Text>
                                        <Text className="text-[16px] font-line-bold text-primary">km</Text>
                                    </View>
                                    <View className="bg-[#1C1C1E] rounded-[16px] p-4 flex-1 items-center justify-center min-h-[100px] shadow-lg shadow-black/50">
                                        <Text className="text-[16px] font-line-bold mb-1 text-primary">Duration</Text>
                                        <Text className="text-white text-[32px] font-line-bold">{formatDuration(data?.duration || 0)}</Text>
                                    </View>
                                </View>
                                <View className="flex-row gap-x-[12px]">
                                    <View className="bg-[#1C1C1E] rounded-[16px] p-4 flex-1 items-center justify-center min-h-[100px] shadow-lg shadow-black/50">
                                        <Text className="text-[16px] font-line-bold mb-1 text-primary">Avg. Pace</Text>
                                        <Text className="text-white text-[32px] font-line-bold">{formatPace(data?.avgPace || 0)}</Text>
                                    </View>
                                    <View className="bg-[#1C1C1E] rounded-[16px] p-4 flex-1 items-center justify-center min-h-[100px] shadow-lg shadow-black/50">
                                        <Text className="text-[16px] font-line-bold mb-1 text-primary">Calories</Text>
                                        <Text className="text-white text-[32px] font-line-bold">{data?.burn || 0}</Text>
                                        <Text className="text-[16px] font-line-bold text-primary">kcal</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                ) : (
                    <View className="flex-col gap-y-[20px]">
                        <Text className="font-line-xbold text-primary text-[48px]">Challenge{'\n'}YourSelf</Text>
                        <Text className="font-line-bold text-white text-[24px]">Set your first weekly goal.</Text>
                        <View className="flex-row justify-between">
                            <GoalRing size={175} strokeWidth={40} current={data?.current || 0} target={target} />
                            <View className="flex-col items-center justify-end w-[150px]">
                                <GoalPicker target={target} setTarget={setTarget} />
                                <Text className="font-line-bold text-primary text-[24px] -mt-4">{data?.unit || 'km'}</Text>
                            </View>

                        </View>
                        <TouchableOpacity
                            className={`bg-primary w-full py-4 items-center rounded-full shadow-lg shadow-primary/50 ${isCreating ? 'opacity-50' : ''}`}
                            onPress={() => createGoal(target)}
                            disabled={isCreating}
                        >
                            <Text className="text-xl font-line-bold text-black">
                                {isCreating ? 'Creating...' : 'Confirm'}
                            </Text>
                        </TouchableOpacity>
                        <View className="bg-primary w-full h-[2px]"></View>
                        <View>
                            <Text className="font-line-bold text-white text-[24px]">Last Week.</Text>
                        </View>
                        <Graph />

                    </View>
                )}
            </ScrollView>


        </View>
    );
};

export default WeeklyGoalPage;