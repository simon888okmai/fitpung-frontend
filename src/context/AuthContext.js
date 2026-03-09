import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isProfileComplete, setIsProfileComplete] = useState(false);

    const login = async (token, userData, isComplete) => {
        setIsLoading(true);
        setUserToken(token);
        setUserInfo(userData);
        setIsProfileComplete(isComplete);
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
        await AsyncStorage.setItem('isProfileComplete', JSON.stringify(isComplete));
        setIsLoading(false);
    };
    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        setIsProfileComplete(false);
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('isProfileComplete');
        setIsLoading(false);
    };

    const completeProfile = async () => {
        setIsProfileComplete(true);
        await AsyncStorage.setItem('isProfileComplete', JSON.stringify(true));
    };


    const isLoggedIn = async () => {
        try {
            setIsLoading(true);

            let userToken = await AsyncStorage.getItem('userToken');
            let userInfo = await AsyncStorage.getItem('userInfo');
            let isProfileCompleteStr = await AsyncStorage.getItem('isProfileComplete');

            if (userToken) {
                setUserToken(userToken);
                setUserInfo(JSON.parse(userInfo));
                setIsProfileComplete(JSON.parse(isProfileCompleteStr) || false);
            }
        } catch (e) {
            console.log(`isLoggedIn error ${e}`);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, completeProfile, isLoading, userToken, userInfo, isProfileComplete }}>
            {children}
        </AuthContext.Provider>
    );
};