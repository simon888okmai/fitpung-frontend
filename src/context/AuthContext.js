import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = async (token, userData) => {
        setIsLoading(true);
        setUserToken(token);
        setUserInfo(userData);
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
        setIsLoading(false);
    };
    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userInfo');
        setIsLoading(false);
    };
    const isLoggedIn = async () => {
        try {
            setIsLoading(true);

            let userToken = await AsyncStorage.getItem('userToken');
            let userInfo = await AsyncStorage.getItem('userInfo');

            if (userToken) {
                setUserToken(userToken);
                setUserInfo(JSON.parse(userInfo));
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
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};