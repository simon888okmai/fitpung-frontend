import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchProfile = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error("No token found");

        const response = await fetch(`${BASE_URL}/profile/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.message || "Failed to fetch profile");
        }

        return json.data;
    } catch (error) {
        throw error;
    }
};

export const updateProfile = async (profileData) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error("No token found");

        const response = await fetch(`${BASE_URL}/profile/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profileData)
        });

        const json = await response.json();
        if (!response.ok) throw new Error(json.message || "Failed to update profile");

        return json;
    } catch (error) {
        throw error;
    }
};
