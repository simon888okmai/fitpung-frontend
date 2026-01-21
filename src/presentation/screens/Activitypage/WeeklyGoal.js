import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { WEEKLY_GOAL_EMPTY, WEEKLY_GOAL_ACTIVE } from '../../../data/WeeklyGoal';
import GoalRing from '../../components/GoalRing';
import GoalPicker from '../../components/GoalPicker';

const WeeklyGoalPage = () => {
    const navigation = useNavigation();
    const [target, setTarget] = useState(100);

    const data = WEEKLY_GOAL_EMPTY;
    const hasGoal = data.hasGoal;

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
                    <View className="flex-col">
                        <Text className="font-line-xbold text-primary text-[48px]">Challenge{'\n'}YourSelf</Text>
                        <Text className="font-line-bold text-white text-[24px]">Set your first weekly goal.</Text>
                        <View className="flex-row">
                            <GoalRing current={data.current} target={data.target} />
                        </View>

                    </View>
                ) : (
                    <View className="flex-col gap-y-[20px]">
                        <Text className="font-line-xbold text-primary text-[48px]">Challenge{'\n'}YourSelf</Text>
                        <Text className="font-line-bold text-white text-[24px]">Set your first weekly goal.</Text>
                        <View className="flex-row justify-between">
                            <GoalRing size={175} strokeWidth={40} current={data.current} target={target} />
                            <View className="flex-col items-center justify-end w-[150px]">
                                <GoalPicker target={target} setTarget={setTarget} />
                                <Text className="font-line-bold text-primary text-[24px] -mt-4">{data.unit}</Text>
                            </View>

                        </View>
                        <TouchableOpacity
                            className="bg-primary w-full py-4 items-center rounded-full shadow-lg shadow-primary/50"
                            onPress={() => { console.log(target) }}
                        >
                            <Text className="text-xl font-line-bold text-black">Confirm</Text>
                        </TouchableOpacity>
                        <View className=""></View>


                    </View>
                )}
            </ScrollView>


        </View>
    );
};

export default WeeklyGoalPage;