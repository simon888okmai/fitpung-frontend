import React from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const BackButton = ({ onPress }) => (
    <SafeAreaView style={styles.header}>
        <TouchableOpacity
            onPress={onPress}
            className="bg-black/50 w-12 h-12 rounded-full justify-center items-center ml-4"
        >
            <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
    </SafeAreaView>
);

export const ActionButtons = ({ onStartPress, onLocationPress, onShoePress }) => (
    <View style={styles.actionsContainer}>
        {/* Shoe Selection Button */}
        <TouchableOpacity
            onPress={onShoePress}
            className="bg-[#1C1C1E] w-16 h-16 rounded-full justify-center items-center shadow-lg border border-white/10"
        >
            <MaterialCommunityIcons name="shoe-sneaker" size={32} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Start Button */}
        <TouchableOpacity
            onPress={onStartPress}
            className="bg-[#B1FC30] w-24 h-24 rounded-full justify-center items-center shadow-xl shadow-primary/50"
        >
            <Text className="text-black font-line-xbold text-xl uppercase italic">Start</Text>
        </TouchableOpacity>

        {/* Center Location Button */}
        <TouchableOpacity
            onPress={onLocationPress}
            className="bg-[#1C1C1E] w-16 h-16 rounded-full justify-center items-center shadow-lg border border-white/10"
        >
            <Ionicons name="navigate" size={28} color="#B1FC30" />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    actionsContainer: {
        position: 'absolute',
        bottom: 160, // Adjusted further up to prevent overlap with the padded RunStatsCard
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        zIndex: 10,
    },
});
