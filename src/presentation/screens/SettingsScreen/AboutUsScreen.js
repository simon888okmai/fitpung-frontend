import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AboutUsScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 bg-color">
            <StatusBar barStyle="light-content" />
            <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center mb-[20px] pt-[20px] px-[22px]">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                        <Ionicons name="arrow-back" size={28} color="#B1FC30" />
                    </TouchableOpacity>
                    <Text className="font-line-bold text-[28px] text-primary">About Us</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 60 }}>
                    <Text className="text-white font-line-bold text-[22px] mt-2 mb-2">FitPung</Text>
                    <Text className="text-[#AAAAAA] font-line text-[14px] mb-6">Version: 1.0.0</Text>

                    <Text className="text-white font-line text-[16px] leading-[26px] mb-8">
                        FitPung is designed specifically for beginner runners who want to transform their lifestyle but don’t know where to start.
                    </Text>
                    <Text className="text-white font-line text-[16px] leading-[26px] mb-8">
                        We believe that running shouldn't be intimidating it should be insightful and fun.
                    </Text>
                    <Text className="text-white font-line text-[16px] leading-[26px] mb-8">
                        FitPung is currently a university project developed with passion. We are constantly learning and evolving, with plans to introduce even more exciting features to help you reach your goals faster and more enjoyably.
                    </Text>
                    <Text className="text-white font-line text-[16px] leading-[26px] mb-8">
                        Stay tuned for future updates!
                    </Text>


                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default AboutUsScreen;
