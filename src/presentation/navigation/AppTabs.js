import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Homepage from '../screens/Homepage/HomePage';
import ActivityPage from '../screens/Activitypage/ActivityPage';
import RunPage from '../screens/RunPage/RunPage';
import { HomeIcon, RunIcon, ActivityIcon } from '../../../assets/icons/Icon';

import { View, Text, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#1C1C1C',
                    height: 100,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 10,
                },
                headerTintColor: '#FFFFFF',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => console.log('Profile pressed')} style={{ marginLeft: 22 }}>
                        <Ionicons name="person-circle-outline" size={30} color="#FFFFFF" />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => console.log('Settings pressed')} style={{ marginRight: 22 }}>
                        <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                ),
                tabBarStyle: {
                    backgroundColor: '#1C1C1C',
                    borderTopColor: '#333',
                    height: 80,
                    paddingBottom: 5,
                    paddingTop: 7,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: -4,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 10,
                },
                tabBarLabelStyle: {
                    fontFamily: 'LINESeedSans-Bold',
                    fontSize: 12,
                    marginBottom: 5,
                },
                tabBarActiveTintColor: '#B1FC30',
                tabBarInactiveTintColor: '#FFFFFF',

                headerTitleStyle: {
                    fontFamily: 'LINESeedSans-Bold',
                    fontSize: 22,
                },

                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return <HomeIcon size={size} color={color} />;
                    }
                    else if (route.name === 'Run') {
                        return <RunIcon size={size} color={color} />;
                    }
                    else if (route.name === 'Activity') {
                        return <ActivityIcon size={size} color={color} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Home" component={Homepage} options={{ title: 'Home' }} />
            <Tab.Screen name="Run" component={RunPage} options={{ title: 'Run', headerShown: false }} />
            <Tab.Screen name="Activity" component={ActivityPage} options={{ title: 'Activity' }} />
        </Tab.Navigator>
    );
}