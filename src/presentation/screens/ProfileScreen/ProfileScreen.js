import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from '../../hooks/useProfile';

const EditModal = ({ title, value, unit, onSave, onCancel, keyboardType = 'numeric' }) => {
    const [inputValue, setInputValue] = useState(String(value || ''));

    return (
        <View className="absolute z-50 w-full h-full justify-center items-center bg-black/80 px-4">
            <View className="bg-[#1E1E1E] w-full p-6 rounded-[20px] items-center">
                <Text className="text-white text-xl font-line-bold mb-4">Edit {title}</Text>
                <View className="flex-row items-end border-b border-[#B1FC30] mb-6 w-1/2 justify-center">
                    <TextInput
                        className="text-white text-4xl font-line-bold text-center flex-1"
                        value={inputValue}
                        onChangeText={setInputValue}
                        keyboardType={keyboardType}
                        autoFocus
                        selectionColor="#B1FC30"
                    />
                    <Text className="text-[#AAAAAA] text-lg font-line-bold mb-1 ml-2">{unit}</Text>
                </View>
                <View className="flex-row justify-between w-full">
                    <TouchableOpacity onPress={onCancel} className="flex-1 mr-2 bg-[#333333] p-3 rounded-full items-center">
                        <Text className="text-white font-line-bold">Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSave(inputValue)} className="flex-1 ml-2 bg-primary p-3 rounded-full items-center">
                        <Text className="text-black font-line-bold">Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { profile, loading, error, refetch, updateData, isUpdating } = useProfile();
    const [editingField, setEditingField] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [refetch])
    );

    if (loading && !profile) {
        return (
            <View className="flex-1 bg-color justify-center items-center">
                <ActivityIndicator size="large" color="#B1FC30" />
            </View>
        );
    }

    const handleSave = (val) => {
        const numVal = parseFloat(val);
        if (isNaN(numVal) || numVal <= 0) {
            setEditingField(null);
            return;
        }

        if (editingField === 'weight') {
            updateData({ weight: numVal });
        } else if (editingField === 'height') {
            updateData({ height: numVal });
        }

        setEditingField(null);
    };

    return (
        <SafeAreaView className="flex-1 bg-color relative">
            <StatusBar barStyle="light-content" />

            {editingField && (
                <EditModal
                    title={editingField === 'weight' ? 'Weight' : 'Height'}
                    value={editingField === 'weight' ? profile?.weight : profile?.height}
                    unit={editingField === 'weight' ? 'kg' : 'cm'}
                    onSave={handleSave}
                    onCancel={() => setEditingField(null)}
                />
            )}

            <View className="flex-1 px-[22px]">
                {/* Header */}
                <View className="flex-row items-center justify-between mb-[20px] pt-[20px]">
                    <View className="flex-row items-center">
                        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                            <Ionicons name="arrow-back" size={28} color="#B1FC30" />
                        </TouchableOpacity>
                        <Text className="font-line-bold text-[28px] text-white">Profile</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                    {/* Avatar Area */}
                    <View className="items-center mt-6 mb-8">
                        <View className="w-[100px] h-[100px] rounded-full bg-[#1E1E1E] items-center justify-center border-2 border-primary overflow-hidden shadow-lg shadow-black">
                            <Ionicons name="person" size={50} color="#666666" />
                        </View>
                        <View className="mt-4 items-center">
                            <Text className="text-white text-[24px] font-line-bold">{profile?.name || 'Runner'}</Text>
                        </View>
                    </View>

                    {/* Stats Area */}
                    <Text className="text-[#AAAAAA] font-line-bold text-[14px] mb-[12px] ml-[4px]">Body Metrics</Text>

                    <TouchableOpacity
                        onPress={() => setEditingField('weight')}
                        className="flex-row items-center justify-between bg-[#1E1E1E] p-[20px] rounded-[16px] mb-[12px]"
                    >
                        <View className="flex-row items-center gap-x-[16px]">
                            <View className="bg-color p-2 rounded-full">
                                <Ionicons name="scale-outline" size={24} color="#B1FC30" />
                            </View>
                            <View>
                                <Text className="text-[#AAAAAA] text-[12px] font-line-bold">Weight</Text>
                                <Text className="text-white text-[20px] font-line-bold">
                                    {profile?.weight ? `${profile.weight} kg` : '--'}
                                </Text>
                            </View>
                        </View>
                        <Ionicons name="pencil" size={20} color="#666666" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setEditingField('height')}
                        className="flex-row items-center justify-between bg-[#1E1E1E] p-[20px] rounded-[16px] mb-[12px]"
                    >
                        <View className="flex-row items-center gap-x-[16px]">
                            <View className="bg-color p-2 rounded-full">
                                <Ionicons name="body-outline" size={24} color="#B1FC30" />
                            </View>
                            <View>
                                <Text className="text-[#AAAAAA] text-[12px] font-line-bold">Height</Text>
                                <Text className="text-white text-[20px] font-line-bold">
                                    {profile?.height ? `${profile.height} cm` : '--'}
                                </Text>
                            </View>
                        </View>
                        <Ionicons name="pencil" size={20} color="#666666" />
                    </TouchableOpacity>

                    <View className="flex-row items-center justify-between bg-[#1E1E1E] p-[20px] rounded-[16px] mb-[12px] opacity-70">
                        <View className="flex-row items-center gap-x-[16px]">
                            <View className="bg-color p-2 rounded-full">
                                <Ionicons name="male-female-outline" size={24} color="#B1FC30" />
                            </View>
                            <View>
                                <Text className="text-[#AAAAAA] text-[12px] font-line-bold">Gender</Text>
                                <Text className="text-white text-[20px] font-line-bold capitalize">
                                    {profile?.gender || '--'}
                                </Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
