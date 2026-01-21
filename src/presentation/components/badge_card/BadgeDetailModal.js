import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BadgeDetailModal = ({ visible, onClose, badge }) => {
    if (!badge) return null;

    const isUnlocked = badge.unlocked;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/85 items-center justify-center p-[25px]">

                <View className="bg-[#1E1E1E] w-full max-w-[340px] rounded-[30px] p-[30px] items-center relative shadow-2xl shadow-black">

                    <TouchableOpacity
                        onPress={onClose}
                        className="absolute top-[20px] right-[20px] z-10 p-2"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="close" size={28} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Text className={`text-[26px] font-line-bold mb-[20px] text-center ${isUnlocked ? 'text-[#B1FC30]' : 'text-gray-400'}`}>
                        {badge.name}
                    </Text>

                    <View className={`mb-[25px] ${!isUnlocked && 'opacity-50 grayscale'}`}>
                        <Text className="text-[110px]">{badge.icon}</Text>
                    </View>

                    {isUnlocked ? (
                        <View className="items-center w-full">
                            <Text className="text-white text-[16px] font-line-bold mb-[8px]">
                                Unlocked on <Text className="text-[#B1FC30]">{badge.date}</Text>
                            </Text>

                            <Text className="text-[#B1FC30] text-[14px] font-line-bold mb-[8px] mt-[10px] uppercase tracking-widest">
                                Mission
                            </Text>

                            <Text className="text-white text-[18px] font-line-bold text-center leading-[26px] mb-[20px]">
                                {badge.condition}
                            </Text>
                        </View>
                    ) : (
                        <View className="items-center w-full">
                            <View className="bg-[#333] px-4 py-1 rounded-full mb-[20px]">
                                <Text className="text-gray-400 text-[12px] font-line-bold uppercase">Locked</Text>
                            </View>

                            <Text className="text-gray-300 text-[18px] font-line-bold text-center leading-[26px] px-2">
                                {badge.condition || "Keep running to unlock this badge!"}
                            </Text>
                        </View>
                    )}

                </View>
            </View>
        </Modal>
    );
};

export default BadgeDetailModal;