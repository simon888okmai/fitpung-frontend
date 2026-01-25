import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const fetchBadges = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error("No token found");

        const response = await fetch(`${BASE_URL}/badges`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.error || "Failed to fetch badges");
        }

        return json.data;

    } catch (error) {
        console.error("Fetch Badge Error:", error);
        throw error;
    }
};