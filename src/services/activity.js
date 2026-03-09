import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export const fetchStatsData = async (month, year) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await fetch(`${BASE_URL}/stats?month=${month}&year=${year}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error || "Fetch failed");

        return json;
    } catch (error) {
        throw error;
    }
};

export const fetchAllRuns = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) throw new Error('No token found');

        const response = await fetch(`${BASE_URL}/activities`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const json = await response.json();
        if (!response.ok) throw new Error(json.error || "Fetch failed");

        return json.data;
    } catch (error) {
        console.error("Fetch All Runs Error:", error);
        throw error;
    }
};