import React from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
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

export const ActionButtons = ({ onStartPress, onLocationPress, onShoePress, isTracking, onFinishPress, hasStarted }) => (
    <View style={styles.actionsContainer}>
        {/* Shoe Selection OR Finish Button (Persists if session started) */}
        {hasStarted ? (
            <TouchableOpacity
                onPress={() => Alert.alert("Hold to Finish", "Please press and hold for 3 seconds to finish your run.")}
                onLongPress={onFinishPress}
                delayLongPress={3000}
                className="bg-red-500 w-16 h-16 rounded-full justify-center items-center shadow-lg"
            >
                <Ionicons name="stop" size={28} color="white" />
            </TouchableOpacity>
        ) : (
            <TouchableOpacity
                onPress={onShoePress}
                className="bg-[#1C1C1E] w-16 h-16 rounded-full justify-center items-center shadow-lg border border-white/10"
            >
                <MaterialCommunityIcons name="shoe-sneaker" size={32} color="#FFFFFF" />
            </TouchableOpacity>
        )}

        {/* Start / Pause Button */}
        <TouchableOpacity
            onPress={onStartPress}
            className={`${isTracking ? 'bg-white' : 'bg-[#B1FC30]'} w-24 h-24 rounded-full justify-center items-center shadow-xl shadow-primary/50`}
        >
            {isTracking ? (
                <Ionicons name="pause" size={40} color="black" />
            ) : (
                <Text className="text-black font-line-xbold text-xl uppercase italic">Start</Text>
            )}
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
        bottom: 160,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        zIndex: 10,
    },
});
