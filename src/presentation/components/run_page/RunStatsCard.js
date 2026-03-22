import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RunStatsCard = ({ distance = "0.00", status = "Running", time = "00:00:00", calories = "0" }) => {
    return (
        <View style={styles.container}>
            <View className="bg-[#1C1C1E] p-10 rounded-[30px] w-full shadow-2xl border border-white/10">
                <View className="flex-row justify-between items-start">
                    <View className="flex-1 items-center">
                        <Text className="text-white font-line-bold text-xl">{distance} km</Text>
                        <Text className="text-primary text-xs mt-1">Distance</Text>
                    </View>

                    <View className="flex-1 items-center">
                        <Text className="text-white font-line-bold text-xl">{status}</Text>
                        <Text className="text-primary text-xs mt-1">Status</Text>
                    </View>

                    <View className="flex-1 items-center">
                        <Text className="text-white font-line-bold text-xl">{time}</Text>
                        <Text className="text-primary text-xs mt-1">Time</Text>
                    </View>
                </View>



                <TouchableOpacity style={styles.expandButton}>
                    <Ionicons name="expand-outline" size={16} color="#B1FC30" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        zIndex: 10,
    },
    expandButton: {
        position: 'absolute',
        top: 15,
        right: 15,
    }
});

export default RunStatsCard;
