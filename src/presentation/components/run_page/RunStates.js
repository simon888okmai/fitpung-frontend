import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const LoadingState = () => (
    <View className="flex-1 bg-color justify-center items-center">
        <ActivityIndicator size="large" color="#B1FC30" />
        <Text className="text-white mt-4 font-line-bold">Detecting Location...</Text>
    </View>
);

export const ErrorState = ({ message, onGoBack }) => (
    <View className="flex-1 bg-color justify-center items-center px-4">
        <Ionicons name="alert-circle-outline" size={60} color="#FF5252" />
        <Text className="text-white text-center mt-4 font-line-bold text-lg">{message}</Text>
        <TouchableOpacity
            className="bg-primary px-8 py-3 rounded-full mt-6"
            onPress={onGoBack}
        >
            <Text className="text-black font-line-bold">Go Back</Text>
        </TouchableOpacity>
    </View>
);
