import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../../context/AuthContext';

import SettingItem from '../../components/settings/SettingItem';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);

    const handleDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        Alert.alert("Account Deleted", "Your account deletion request has been received.");
                        logout();
                    }
                }
            ]
        );
    };

    const openAppSettings = () => {
        Linking.openSettings();
    };

    return (
        <SafeAreaView className="flex-1 bg-color">
            <StatusBar barStyle="light-content" />
            <View className="flex-1">
                {/* Header */}
                <View className="flex-row items-center mb-[20px] pt-[20px] px-[22px]">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                        <Ionicons name="arrow-back" size={28} color="#B1FC30" />
                    </TouchableOpacity>
                    <Text className="font-line-bold text-[28px] text-white">Settings</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 40 }}>

                    <Text className="text-[#AAAAAA] font-line-bold text-[14px] mb-[12px] ml-[4px] mt-[10px]">Permissions</Text>
                    <SettingItem
                        icon="location-outline"
                        title="Location Services"
                        onPress={openAppSettings}
                    />

                    <Text className="text-[#AAAAAA] font-line-bold text-[14px] mb-[12px] ml-[4px] mt-[20px]">About App</Text>
                    <SettingItem
                        icon="information-circle-outline"
                        title="About Us"
                        onPress={() => navigation.navigate('AboutUsScreen')}
                    />
                    <SettingItem
                        icon="document-text-outline"
                        title="Terms of Service"
                        onPress={() => Alert.alert("Terms of Service", "Coming soon...")}
                    />
                    <SettingItem
                        icon="shield-checkmark-outline"
                        title="Privacy Policy"
                        onPress={() => Alert.alert("Privacy Policy", "Coming soon...")}
                    />
                    <View className="items-center my-[10px]">
                        <Text className="text-[#666666] font-line text-[12px]">FitPung Test Version 1.0.0</Text>
                    </View>

                    <Text className="text-[#AAAAAA] font-line-bold text-[14px] mb-[12px] ml-[4px] mt-[20px]">Account</Text>
                    <SettingItem
                        icon="log-out-outline"
                        title="Logout"
                        onPress={logout}
                    />
                    <SettingItem
                        icon="trash-outline"
                        title="Delete Account"
                        titleColor="text-[#FF4444]"
                        isDanger={true}
                        onPress={handleDeleteAccount}
                    />

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default SettingsScreen;
